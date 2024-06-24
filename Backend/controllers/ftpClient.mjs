import ftp from 'basic-ftp';
import { Readable } from 'stream';

let client;

export async function connectFTP() {
    client = new ftp.Client();
    client.ftp.verbose = true;

    try {
        await client.access({
            host: "ftp.jpmotorsgt.com",
            user: "jpmotorsgt@jpmotorsgt.com",
            password: "s)v(8c)MdEL+",
            secure: false
        });
        console.log("Connected to FTP server");
    } catch (err) {
        console.error("Error connecting to FTP server:", err);
        client.close();
    }
}

export async function uploadFile(filename, buffer) {
    try {
        if (!client) {
            throw new Error("FTP client not connected");
        }
        // Convertir el buffer a un stream antes de subir
        const stream = bufferToStream(buffer);
        await client.uploadFrom(stream, `/${filename}`);
        console.log(`File ${filename} uploaded successfully`);
    } catch (err) {
        console.error("Error uploading file:", err);
    }
}

function bufferToStream(buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

export async function listFiles() {
    try {
        if (!client) {
            throw new Error("FTP client not connected");
        }
        const list = await client.list();
        console.log("Listing files in the root directory:");
        console.log(list);
        return list;
    } catch (err) {
        console.error("Error listing files:", err);
    }
}
