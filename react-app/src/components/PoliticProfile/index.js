import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { createResponse } from "../../store/reponses";

const PoliticProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  const politic = useSelector((state) => state.politics[params.id]);

  const [responded, setResponded] = useState(false);

  let response;
  let yays = 0;
  let nays = 0;
  if (politic) {
    politic.responses.forEach(res => {
      if (res.node.id == user.id) {
        response = res;
      }
    });
  }

  const respond = async (e) => {
    await dispatch(createResponse(user.id, politic.id, e.target.value));
    setResponded(true)
    // toastify
    // history.push(`/politic/${politic.id}`);
  }

  return (
    <div className='order-profile-container'>
      <div>
        <div className='order-profile'>
          {politic &&
            <>
              <div style={{ color: 'black' }} className='order-profile-title'>
                {politic.title}
              </div>
              {/* <div style={{ color: 'rgb(155, 155, 155)' }} className='order-profile-for'>
                    {order.nonprofit_username}
                </div> */}
              <div style={{ marginTop: '8px' }} className='order-desc'>
                {politic.description}
              </div>
              <div className='order-start'>
                question: {politic.question}
              </div>
              {!response ?
                <div style={{ marginTop: '4px' }} className='order-karma'>
                  <button value="Y" onClick={respond}>yay</button>
                  <button value="N" onClick={respond}>nay</button>
                </div> :
                <p>yays: {politic.yays}, nays: {politic.nays}</p>
              }
              <div style={{ marginTop: '4px' }} className='order-karma'>
                end time: {politic.end_time}
              </div>
              {/* <div className='order-status'>
                  {(order.status == 'Open') &&
                    <p className='open-status'>{order.status}</p>
                  }
                  {(order.status == 'Pending') &&
                    <p className='pending-status'>{order.status} - awaiting node confirmation</p>
                  }
                  {(order.status == 'In Progress') &&
                    <p className='pending-status'>{order.status}</p>
                  }
                  {(order.status == 'Complete') &&
                    <p className='complete-status'>{order.status}</p>
                  }
                </div> */}
              {/* {(order.status == 'Open' && !user.nonprofit) && 
                  <div className='apply-link-container'> 
                    <Link className='apply-link' to={`/applications/new/${order.id}`}>> apply</Link>
                  </div>
                } */}
            </>
          }
        </div>
        <div className='back-link-container'>
          <Link className='back-link' to='/'>back</Link>
        </div>
      </div>
    </div>
  );
};

export default PoliticProfile;
