const {useState} = React; //從React物件中取出useState方法

const SignInForm = ({api,setToken}) => {
    const [emailSignIn, setEmailSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isErrorMessage, setIsErrorMessage] = useState(false);

  

    
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
        }).finally(()=>{
          setEmailSignIn('');
          setPasswordSignIn('');
          console.log('登入流程結束')
        })
  
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

const SignUpForm = ({api,setToken}) => {
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [nicknameSignUp, setNicknameSignUp] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [isErrorMessage, setIsErrorMessage] = useState(false);
  
    
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
        }).finally(()=>{
          setEmailSignIn('');
          setPasswordSignIn('');
          console.log('登入流程結束')
        })
  
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

const TodoForm = ({api,token}) =>{

  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () =>{
    axios.post(`${api}/todos/`,
      {content: newTodo},
      {
      headers:{
        Authorization: token,
      }
    })
    .then(response =>{
      console.log(response.data.newTodo);
      console.log('新增成功');
      setNewTodo('');
      getTodos();
    })
    .catch(error =>{
      console.log(error.response.data);
      console.log('新增失敗');
    })
  };

  const getTodos= ()=>{
    axios.get(`${api}/todos`, {
      headers: { Authorization: token }
    })
    .then(response =>{
      setTodos(response.data.data);
      console.log('資料取得成功');
    })
    .catch(error =>{
      console.log(error.response.data);
      console.log('資料取得失敗');
    })
  }

  const deleteTodo = async (id) => {
    try{
      const response = await axios.delete(`${api}/todos/${id}`,{
        headers: { Authorization: token }
      })
      console.log(response);
      getTodos(token);
    }catch(error){
      console.log(error);
      console.log('刪除失敗');
    }finally{
      console.log('刪除流程完成');
    }


  };

  return (
    <div className="container mt-2">
      <form>
        <h2>新增資料</h2>
        <div className="form-group">
          <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          type="text"
          className="form-control"
          placeholder="請輸入內容"
          />
          </div>
          <button type="button" className="btn btn-primary mt-3" onClick={addTodo}>送出</button>
      </form>
      <h2>取得資料</h2>
      <ul>
        {todos.map((item) => (
          <li key={item.id} className="mt-3 ms-1">
            {item.content}
            <button
              onClick={() => deleteTodo(item.id)}
              type="button"
              className="btn btn-danger ms-2"
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
  </div>)
}

function App(){

  const [token, setToken] = useState('');
  const api = 'https://todolist-api.hexschool.io';

    return(
        <div>
            <SignInForm api={api} setToken={setToken}></SignInForm>
            <SignUpForm api={api} setToken={setToken}></SignUpForm>
            <TodoForm api={api} token={token}></TodoForm>
        </div>
    )
}

const el = document.querySelector('#root');
const root = ReactDOM.createRoot(el);
root.render(<App/>);