import './Weather.css';

function Card({id, value, icon}) {
    return (
        <div className="card">
            <div className="card-body">
                <div className="card-head">
                    {icon}
                    <p className="card-title">{id}</p>
                </div>
                <div className='card-content'>
                    <p>{value}</p>
                </div>
            </div>
        </div>
    );
}


export default Card;