import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ExportExcelFile = ({ dataToExport, filename }) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToExcel = (dataToExport, fileName) => {
        let cleanData = [];

        dataToExport.reduce((acc, user) => {
            const cleanId = String(user.id).replaceAll('.', '').replaceAll('-', '').toUpperCase();
            user.name = user.name.replaceAll('+', ' ');

            if (!acc.includes(cleanId)) {
                if (cleanId.length >= 8 && cleanId.length <= 20) {
                    if ((cleanId.match(new RegExp("[A-Za-z]", "g")) || []).length < 1) {
                        acc.push(cleanId)
                        let name = '';
                        let surname = '';
                        let splitArr = user.name.split(' ');

                        switch (splitArr.length) {
                            case 1:
                                name = splitArr[0]
                                break;

                            case 2:
                                name = splitArr[0]
                                surname = splitArr[1]
                                break;

                            case 3:
                                name = splitArr[0]
                                surname = `${splitArr[1]} ${splitArr[2]}`
                                break;

                            case 4:
                                name = `${splitArr[0]} ${splitArr[1]}`
                                surname = `${splitArr[2]} ${splitArr[3]}`
                                break;

                            case 5:
                                name = `${splitArr[0]} ${splitArr[1]} ${splitArr[2]}`
                                surname = `${splitArr[3]} ${splitArr[4]}`
                                break;

                            default:
                                name = `${splitArr[0]} ${splitArr[1]} ${splitArr[2]}`
                                surname = `${splitArr[3]} ${splitArr[4]}`
                                break;
                        }

                        let nationality = 'CHILE'
                        let type = 'C NAC'

                        switch (user.country.toUpperCase()) {
                            case 'CL':
                                nationality = 'CHILE';
                                type = 'C NAC'
                                break;

                            case 'PE':
                                nationality = 'PERU';
                                type = 'C EXT'
                                break;

                            case 'BR':
                                nationality = 'BRASIL';
                                type = 'C EXT'
                                break;

                            case 'EC':
                                nationality = 'ECUADOR';
                                type = 'C EXT'
                                break;
                        }

                        cleanData.push({
                            ID: cleanId,
                            Apellidos: surname.toUpperCase(),
                            Nombres: name.toUpperCase(),
                            Nacionalidad: nationality,
                            Estatus: 'A',
                            Tipo: type
                        });
                    }
                }
            } else {
                console.log('cleanId duplicated', cleanId);
            }

            return acc;
        }, []);

        const ws = XLSX.utils.json_to_sheet(cleanData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });

        FileSaver.saveAs(data, fileName + fileExtension);

    }

    return (
        <div className='text-center'>
            <button className='btn btn-success' onClick={() => exportToExcel(dataToExport, filename)}>Export</button>
        </div>
    )
}

export default ExportExcelFile;