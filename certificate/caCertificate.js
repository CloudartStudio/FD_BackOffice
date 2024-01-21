const fs = require("fs");
const path = require("path");

function readCACertificate(sslCertificate) {
    const fileName = sslCertificate + ".crt";
    const basePath = process.cwd();
    const filePath = path.join(basePath, "certificate", fileName);
    try {
        const certificate = fs.readFileSync(filePath, "utf8");
        return certificate;
    } catch (error) {
        console.error("Error reading CA certificate:", error);
        return null;
    }
}

export default readCACertificate;
