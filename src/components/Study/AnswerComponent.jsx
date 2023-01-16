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
                            {/* <input id="icon" style="text-indent:17px;" type="text" placeholder="Username" /> */}
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