const {useState} = React; //從React物件中取出useState方法

const SignInForm = () => {
    const [emailSignIn, setEmailSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [token, setToken] = useState('');
  
    const api = 'https://todolist-api.hexschool.io';
    
    // 練習區塊
    const signIn = () => {
        axios.post(`${api}/users/sign_in`,{
            email: emailSignIn,
            password: passwordSignIn,
          })
        .then(res=>{
            console.log(res.data);
            setToken(res.data.token);
            setResponseMessage('登入成功');
            setIsErrorMessage(false);
        }).catch(error=>{
            setResponseMessage('登入失敗');
            setIsErrorMessage(true);
        }).finally(()=>console.log('登入流程結束'))
  
    };
    // 區塊結束
    
    return (
      <div className="container mt-2">
        <h2>登入</h2>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail2">Email</label>
            <input
              value={emailSignIn}
              onChange={(e) => setEmailSignIn(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail2"
              placeholder="請輸入信箱"
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputPassword2">Password</label>
            <input
              value={passwordSignIn}
              onChange={(e) => setPasswordSignIn(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="請輸入密碼"
            />
          </div>
          <button type="button" className="btn btn-success" onClick={signIn}>
            登入
          </button>
        </form>
        {responseMessage && (
          <p className={`h3 mt-3 ${isErrorMessage ? 'text-danger' : 'text-success'}`}>
            {responseMessage}
          </p>
        )}
      </div>
    );
  };

  const SignUpForm = () => {
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [nicknameSignUp, setNicknameSignUp] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isErrorMessage, setIsErrorMessage] = useState(false);
    const [token, setToken] = useState('');
  
    const api = 'https://todolist-api.hexschool.io';
    
    // 練習區塊
    const signUp = () => {
        axios.post(`${api}/users/sign_up`,{
            email: emailSignUp,
            password: passwordSignUp,
            nickname:nicknameSignUp
          })
        .then(res=>{
            console.log(res.data);
            setToken(res.data.token);
            setResponseMessage('註冊成功');
            setIsErrorMessage(false);
        }).catch(error=>{
            setResponseMessage('註冊失敗');
            setIsErrorMessage(true);
        }).finally(()=>console.log('註冊流程結束'))
  
    };
    // 區塊結束
    
    return (
      <div className="container mt-2">
        <h2>註冊</h2>
        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail">Email</label>
            <input
              value={emailSignUp}
              onChange={(e) => setEmailSignUp(e.target.value)}
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="請輸入信箱"
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputPassword">Password</label>
            <input
              value={passwordSignUp}
              onChange={(e) => setPasswordSignUp(e.target.value)}
              type="password"
              className="form-control"
              id="exampleInputPassword"
              placeholder="請輸入密碼"
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="exampleInputName">暱稱</label>
            <input
              value={nicknameSignUp}
              onChange={(e) => setNicknameSignUp(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="請輸入暱稱"
            />
          </div>
          <button type="button" className="btn btn-success" onClick={signUp}>
            註冊
          </button>
        </form>
        {responseMessage && (
          <p className={`h3 mt-3 ${isErrorMessage ? 'text-danger' : 'text-success'}`}>
            {responseMessage}
          </p>
        )}
      </div>
    );
  };

function App(){
    return(
        <div>
            <SignInForm></SignInForm>
            <SignUpForm></SignUpForm>
        </div>
    )
}

const el = document.querySelector('#root');
const root = ReactDOM.createRoot(el);
root.render(<App/>);