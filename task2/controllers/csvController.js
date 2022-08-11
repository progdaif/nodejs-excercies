/**
 * Controller handling csv file operations
 * @module csvController
 */

/** @const fs [files handler] */
const fs = require('fs');

/** @const csv [CSV handler] */
const csv = require('fast-csv');

/** @const ObjectsToCsv [CSV data converter] */
const ObjectsToCsv = require('objects-to-csv');

/** @const Archiver [handling archiving files] */
const Archiver = require('archiver');

/**
 * Get CSV file
 * 
 * @param  {Request} req [Object passed to function]
 * @param  {Response} res [Object to be responded]
 * @param  {Function} callback [function to be invocked in the callback]
 * 
 * @return void
 */
const get = (req, res, callback) => {
    console.log(req.file);
    try {

        // Check CSV file is sent
        if (req.file == undefined) {
            return res.status(400).send({
                message: "Please upload a CSV file!"
            });
        }

        // Save CSV File
        let csvData = [];
        let filePath = __basedir + '/../uploads/' + req.file.filename;
        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on("error", (error) => {
                throw error.message;
            })
            .on("data", (row) => {
                if (row['ID'] != '') csvData.push(row);
            })
            .on("end", () => {
                handelCsv(req, res, csvData);
                callback();
            });
    } catch (error) {
        console.log("catch error-", error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
}

/**
 * Handle CSV file
 * 
 * @param  {Request} req [Object passed to function]
 * @param  {Response} res [Object to be responded]
 * @param  {Object} data [Data coming from file to be operated]
 * 
 * @return void
 */
const handelCsv = async (req, res, data) => {
    let temp = {};
    let tempBrand = [];
    data.forEach(item => {
        if (typeof temp[item['Name']] == 'undefined') temp[item['Name']] = parseInt(item['Quantity']);
        else temp[item['Name']] += parseInt(item['Quantity']);

        if (typeof tempBrand[item['Name']] == 'undefined') tempBrand[item['Name']] = {};

        if (typeof tempBrand[item['Name']][item['Brand']] == 'undefined') {
            tempBrand[item['Name']][item['Brand']] = 1;
        } else tempBrand[item['Name']][item['Brand']] += 1;
    });

    //loop for first csv
    let firstFile = [];
    for (const name in temp) {
        firstFile.push(
            { Name: name, Sold: temp[name] / data.length }
        );
    }

    //loop for second csv
    let secondFile = [];
    for (const name in tempBrand) {
        let brandName = ''; let quantity = 0;
        for (const brand in tempBrand[name]) {
            if (tempBrand[name][brand] > quantity) {
                brandName = brand;
                quantity = tempBrand[name][brand];
            }
        }
        secondFile.push(
            { Name: name, Brand: brandName }
        );
    }
    await downloadCsv(req, res, firstFile, secondFile);
}

/**
 * Download CSV file
 * 
 * @param  {Request} req [Object passed to function]
 * @param  {Response} res [Object to be responded]
 * @param  {File} firstFile [firstFile to be archived]
 * @param  {File} secondFile [secondFile to be archived]
 * 
 * @return void
 */
const downloadCsv = async (req, res, firstFile, secondFile) => {
    let Objcsv = new ObjectsToCsv(firstFile);
    await Objcsv.toDisk(__basedir + '/../uploads/0_' + req.file.filename);

    Objcsv = new ObjectsToCsv(secondFile);
    await Objcsv.toDisk(__basedir + '/../uploads/1_' + req.file.filename);

    let Archiver = require('archiver');

    // Tell the browser that this is a zip file.
    res.writeHead(200, {
        'Content-Type': 'application/zip',
        'Content-disposition': 'attachment; filename=' + req.file.filename + '.zip'
    });

    let zip = Archiver('zip');

    // Send the file to the page output.
    zip.pipe(res); // <--- GENERATES TypeError: Cannot read property 'length' of null 

    // Create zip with some files. Two dynamic, one static. Put #2 in a sub folder.
    zip.append(fs.ReadStream(__basedir + '/../uploads/0_' + req.file.filename), { name: '0_' + req.file.filename })
        .append(fs.ReadStream(__basedir + '/../uploads/1_' + req.file.filename), { name: '1_' + req.file.filename })
        .finalize();
}

module.exports = {
    get
};
