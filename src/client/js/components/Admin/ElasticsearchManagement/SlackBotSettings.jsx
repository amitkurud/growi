import React from 'react';


function SlackBotSettings(props) {
  return (
    <>
      <div className="row mb-3">
        <label className="col-md-4 text-left text-md-right">Signing Secret</label>
        <div className="col-md-7">
          <input
            className="form-control"
            type="text"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-md-4 text-left text-md-right">Bot User OAuth Token</label>
        <div className="col-md-7">
          <input
            className="form-control"
            type="text"
          />
        </div>
      </div>
    </>
  );

}

export default SlackBotSettings;
