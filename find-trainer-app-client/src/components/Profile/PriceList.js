import React from 'react';

const PriceList = ({price_list}) => {
    
    return (
        <div className="price-list">
            <table>
                <thead>
                    <tr>
                        <th>Usługa</th>
                        <th>Cena</th>
                    </tr>
                </thead>
                <tbody>
                    {price_list.map((element, index) => (
                        <tr key={index}>
                            <td>{element.service_name}</td>
                            <td>
                                {element.from && <span>od</span>}
                                {element.price}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PriceList;