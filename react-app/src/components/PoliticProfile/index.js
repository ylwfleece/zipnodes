import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";
import { createResponse, getResponses } from "../../store/reponses";
import { getPolitics } from "../../store/politics";
import { toast } from 'react-toastify';

const PoliticProfile = ({ authenticated, setAuthenticated }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const notify = (msg) => toast(msg);

  const user = useSelector((state) => state.session.user);
  const params = useParams()
  const politic = useSelector((state) => state.politics[params.id]);

  const [responded, setResponded] = useState(false);

  let response;
  if (politic) {
    politic.responses.forEach(res => {
      if (res.node.id == user.id) {
        response = res;
      }
    });
  }

  const updateResponded = () => {
    setResponded(true);
  }

  const respond = async (e) => {
    const ans = e.target.value;
    await dispatch(createResponse(user.id, politic.id, ans));
    updateResponded();
    await dispatch(getPolitics());
    notify("Successfully responded: " + ans + "ay");
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
              <div style={{fontStyle: 'italic'}} className='order-start'>
                > {politic.question}
              </div>
              {(!response && !responded && !user.nonprofit) &&
                <div style={{ marginTop: '4px' }} className='order-karma'>
                  <button style={{ marginLeft: '5px', color: 'green' }} value="Y" onClick={respond}>yay</button>
                  <button style={{ marginLeft: '5px', color: 'red' }} value="N" onClick={respond}>nay</button>
                </div> 
              }
              <div style={{ marginTop: '4px' }} className='order-karma-black-lg'>
                yays: {politic.yays}, nays: {politic.nays}
              </div>
              {response && 
                <div style={{ marginTop: '4px' }} className='order-karma'>
                  you responded: {response.answer}ay
                </div>
              }
              <div style={{ marginTop: '4px' }} className='order-karma'>
                polling closes: {politic.end_time}
              </div>
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
