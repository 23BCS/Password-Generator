import { useCallback, useState ,useEffect ,useRef} from "react";

import "./App.css";

function App() {
  const [length, SetLength] = useState(8);
  const [numberAllowed, SetNumberAllowed] = useState(false);
  const [charAllowed, SetCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  
////useRef hook

const passwordRef =useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str = str + "0123456789";
    }
    if (charAllowed) {
      str = str + "!@#$%^&*_-+.,?/|:;";
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

const passwordCopyToClipBoard= useCallback(()=>{
  passwordRef.current?.select();
  passwordRef.current?.setSelection(0,50);
  window.navigator.clipboard.writeText(Password)
}, [Password])



  useEffect(()=> {
    passwordGenerator()
  },[length, numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
      <div className="container">
        <h1 className="h1-text">Password Generator</h1>
        <div className="content">
          <input
            type="text"
            value={Password}
            className="input-field"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button className="btn"
          onClick={passwordCopyToClipBoard}>copy</button>
        </div>
        <div className="element">
          <div className="item">
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              className="range"
              onChange={(e) => {
                SetLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="item">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                SetNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="item">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => {
                SetNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
