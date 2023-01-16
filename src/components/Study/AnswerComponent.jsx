import { useState } from 'react';
import React from 'react';

const AnswerComponent = ({ answerObj, correctAnswer }) => {
    const [trigger, setTrigger] = useState(false);
    const switchMode = () => {
        setTrigger(!trigger);
    };
    return (
        <React.Fragment>
            <div class="accordion" id="accordionWithRadioExample">
                <div class="card accordionarea" >
                    <div class="card-header accordionhead" onClick={switchMode}>
                        <div class="custom-control custom-radio  accordionradiotext">
                            
                            <label class="custom-control-label" for="customRadio1">
                                {answerObj?.answer}
                            </label>
<<<<<<< HEAD
                            
=======
                            {/* <input id="icon" style="text-indent:17px;" type="text" placeholder="Username" /> */}
>>>>>>> 0993144abb3cd69e38f08975e8618fdc5e91ee90
                            <input data-toggle="collapse" data-target="#collapseOne" type="checkbox" id="customRadio1" name="customRadio" class="custom-control-input accordionradio" />
                        </div>
                    </div>
                    {trigger === true ? (
                        <div id="collapseOne" class="collapse" data-parent="#accordionWithRadioExample">
                            <div class="card-body accordionans">{answerObj?.explanation}</div>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            {/* <h3>{answerObj.answer}</h3>
            <p>{answerObj?.explanation}</p>; */}
        </React.Fragment>
    );
};
export default AnswerComponent;