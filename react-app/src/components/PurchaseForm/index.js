import React, { useState } from "react";
import { useHistory, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { createPurchase, getPurchases } from '../../store/purchases';
import { getProjects } from "../../store/projects";
import logo from "../auth/zipnodes_logo.png";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PurchaseForm = ({ authenticated, setAuthenticated }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const params = useParams();
    const project = useSelector((state) => state.projects[params.projectId]);

    const notify = (msg) => toast(msg);

    const [numShares, setNumShares] = useState('');

    const updateNumShares = (e) => {
        setNumShares(e.target.value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const purchase = await dispatch(createPurchase(user.id, project.id, numShares));
        notify(`Successfully purchased ${numShares} of ${project.title}`);
        dispatch(getProjects());
        history.push(`/purchase/${purchase.id}`);
    };

    return (

        <div className='page-container'>
            {project &&
                <div className='container'>
                    <div>
                        <div className='application-form-container'>
                            <div className='paragraph-container flex-container' style={{ width: '100%', padding: '0', marginTop: '0', justifyContent: 'center' }}>
                                <div style={{ width: '80%' }}>
                                    <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontStyle: 'italic', fontSize: '26px', textAlign: 'center' }}>Purchase shares of {project.title}:</p>
                                    <p className='paragraph' style={{ color: 'black', fontWeight: '600', fontSize: '26px', textAlign: 'center' }}>{project.nonprofit.username}</p>
                                    <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '24px', textAlign: 'center' }}>cost per share: ${project.cost_per_share}</p>
                                    <p className='paragraph' style={{ color: 'rgb(155, 155, 155)', fontSize: '22px', textAlign: 'center' }}>millikarma per share: {project.millikarma_per_share}</p>
                                    <p className='paragraph' style={{ color: 'black', fontSize: '22px', textAlign: 'center' }}>available shares: {project.available_shares}</p>
                                    <p className='paragraph' style={{ color: 'black', fontSize: '22px', fontWeight: '600', textAlign: 'center' }}>purchase cost: ${(numShares * project.cost_per_share).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className='flex-container' style={{ justifyContent: 'center' }}>
                                <form onSubmit={onSubmit}>
                                    <div className='field-inputs'>
                                        <input
                                            type="number"
                                            name="numShares"
                                            placeholder='number of shares'
                                            min="1" max={project.available_shares}
                                            onChange={updateNumShares}
                                            value={numShares}
                                        />
                                    </div>
                                    <div className='submit-button-container' style={{ marginTop: '18px' }}>
                                        {numShares <= project.available_shares ?
                                        <button type="submit" className='blue-submit-button'>Submit Purchase</button>
                                        :
                                        <p style={{color: 'red'}}>only {project.available_shares} shares available</p>
                                        }
                                    </div>
                                </form>
                            </div>
                            <div className='errors-container'>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default PurchaseForm;
