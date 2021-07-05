import React, { useState } from 'react'

function WineCard(props) {
    //useState for expanded status
    const [displayAll, setDisplayAll] = useState(false)

    //handleExpandClick
    const handleExpandClick = (event) => {
        event.preventDefault();

        setDisplayAll(!displayAll)
    }

    //handle note input and submit

    //handle "Drink This!" button

    //render additional rows if expanded
    let renderWineInfo
    // if (displayAll) {
    //     renderWineInfo = (
    //         <>
    //             <tr>
    //                 <td className='card-item-category-text'>Price Paid: </td>
    //                 <td className='card-item-data-text'>{props.bottleprice} per bottle</td>
    //             </tr>
    //             <tr>
    //                 <td className='card-item-category-text'># Available: </td>
    //                 <td className='card-item-data-text'>{props.numberavailable}</td>
    //             </tr>
    //         </>
    //     )
    // }

    return (
        <>
            <div className='card-item'>
                <div className='card-item-top-section'>
                    <div className='card-item-img-wrapper'>
                        <img
                            className='card-item-img'
                            alt={props.producer}
                            src='/wine-placeholder.png'
                        />
                    </div>
                    <table className='card-item-table'>
                        <tbody>
                            <tr>
                                <td className='card-item-category-text'>Producer: </td>
                                <td className='card-item-data-text'>{props.producer}</td>
                            </tr>
                            <tr>
                                <td className='card-item-category-text'>Grape: </td>
                                <td className='card-item-data-text'>{props.grape}</td>
                            </tr>
                            <tr>
                                <td className='card-item-category-text'>Region: </td>
                                <td className='card-item-data-text'>{props.region}</td>
                            </tr>
                            <tr>
                                <td className='card-item-category-text'>Vintage: </td>
                                <td className='card-item-data-text'>{props.vintage}</td>
                            </tr>
                            <tr>
                                <td className='card-item-category-text'>Location: </td>
                                <td className='card-item-data-text'>{props.location}</td>
                            </tr>
                            <tr>
                                <td className='card-item-category-text'>Price Paid: </td>
                                <td className='card-item-data-text'>{props.bottleprice} per bottle</td>
                            </tr>
                            <tr>
                                <td className='card-item-category-text'># Available: </td>
                                <td className='card-item-data-text'>{props.numberavailable}</td>
                            </tr>
                            {renderWineInfo}
                        </tbody>
                    </table>
                    {displayAll &&
                        <div className='card-item-textarea-wrapper'>
                            <textarea className='card-item-wine-notes' placeholder="What do you think? Insert tasting notes here..."></textarea>
                            <button
                                className='btn-card-submit-notes'
                            >Save Notes</button>
                        </div>
                    }
                </div>
                <div className='card-item-bottom-section'>
                    <button className='btn-card-drink-wine'>Drink This!</button>
                    <button
                        className={!displayAll ? 'btn-card-expand-toggle' : 'btn-card-close-toggle'}
                        onClick={handleExpandClick}
                    >{!displayAll ? "Expand" : "Close"}</button>
                </div>
            </div>
        </>
    )
}

export default WineCard


