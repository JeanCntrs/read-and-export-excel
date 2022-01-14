import * as XLSX from 'xlsx';

const InputFile = ({ setData }) => {
    const readExcel = file => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.readAsArrayBuffer(file);

            fileReader.onload = e => {
                const bufferArray = e.target.result;
                const workBook = XLSX.read(bufferArray, { type: 'buffer' });
                const sheetName = workBook.SheetNames[0];
                const sheet = workBook.Sheets[sheetName];
                const data = XLSX.utils.sheet_to_json(sheet);

                resolve(data);
            }

            fileReader.onerror = error => {
                reject(error);
            }
        });

        promise.then(data => {
            console.log('data', data);
            setData(prevData => [...prevData, ...data]);
        });
    }

    return (
        <div className="container mt-5">
            <div className="form-group">
                <input
                    className="form-control"
                    type="file"
                    onChange={e => {
                        const file = e.target.files[0]
                        readExcel(file);
                    }}
                />
            </div>
        </div>
    );
}

export default InputFile;