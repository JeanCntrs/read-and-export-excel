import { useState } from 'react';
import Header from './components/Header';
import InputFile from './components/InputFile';
import ExportExcelFile from './components/ExportExcelFile';

const App = () => {
    const filename = 'unique_users'
    const [data, setData] = useState([])

    return (
        <div>
            <Header />
            <InputFile setData={setData} />

            <table className='table container'>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Country</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((d, index) => {
                            console.log('index', index);
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{d.id}</td>
                                    <td>{d.name}</td>
                                    <td>{d.country}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>

            <ExportExcelFile dataToExport={data} filename={filename} />
        </div>
    );
}

export default App;