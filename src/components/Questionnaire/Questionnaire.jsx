import React, { Component } from 'react';
import { connect } from 'react-redux';

class Questionnaire extends Component {
    constructor(props){
        super(props);
        
    }


    render(){
        return(
            <div>
                <h2>Intro Questionnaire</h2>
                <p>Answer a few queations about yourself</p>
                <div>
                    1) As of Today I am in:
                    <select name="year">
                        <option value="2">MS2</option>
                        <option value="3">MS3</option>
                        <option value="4">MS4</option>
                    </select>
                </div>
                <div>
                    2a) If MS2/3, I am interested in:
                    <form>
                        <input type="checkbox" value="Anesthesia" /> Anesthesia<br/>
                        <input type="checkbox" value="Internal Medicine" /> Internal Medicine <br/>
                        <input type="checkbox" value="Emergency Medicine" /> Emergency Medicine<br/>
                        <input type="checkbox" value="OB/GYN" /> OB/GYN <br/>
                        <input type="checkbox" value="General Surgery" /> General Surgery <br/>
                        <input type="checkbox" value="Subspecialty Surgery" /> Subspecialty Surgery <br/>
                        <input type="checkbox" /> Other <input type="text"/> 
                    </form>
                </div>
                <div>
                    2b) If MS4, I am interested in:
                    <form>
                        Applying to: <input type="text" /> <br/>
                        Applied to: <input type="text" /> <br/>
                        Matched in: <input type="text" /> <br/>
                    </form>
                </div>
                <div>
                    3) I am interested in a letter of recommendation <br />
                    Yes <input type="radio"/>
                    No <input type="radio"/>
                    Maybe <input type="radio"/>
                </div>
                <div>
                    4) Prior to this rotation how many of the following have you performed on LIVE patients? <br />
                    Intubations <input type="number" /> 
                    IVs <input type="number" />
                    Mask Ventilations <input type="number" />
                    Central Lines <input type="number" />
                    Arterial Lines <input type="number" />
                </div>
                <div>
                    5) Prior to this rotation I have run a ventialtor. <br />
                    Yes <input type="radio"/>
                    No <input type="radio"/>
                </div>
                <div>
                    6) Set some goals for you rotation. How many of each of the folowing would you like to do before you finish?  <br />
                    IVs <input type="number" /> 
                    Arterial Lines <input type="number" />
                    Mask Ventilations <input type="number" />
                    LMA insertions <input type="number" />
                    Intubations <input type="number" />
                    Planned Airway Management <input type="number" />
                    Airway Assessments <input type="number" />
                    ASA Assessment Scorings <input type="number" />
                </div>
            </div>

        )
    }
}

export default connect()(Questionnaire);