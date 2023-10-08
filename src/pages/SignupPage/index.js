/** @jsxImportSource @emotion/react */
import 'twin.macro';
import React, { useEffect ,useState,useRef } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { faCheck, faTimes,faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const EMAIL_REGEX = /^([\w._-])*[a-zA-Z0-9]+([\w._-])*([a-zA-Z0-9])+([\w._-])+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]{2,8}$/;
const PW_REGEX =  /(?=.*\d)(?=.*[a-z]).{8,}/;

function Register() {
  const router = useNavigate();
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pw, setpw] = useState('');
  const [validpw, setValidpw] = useState(false);
  const [pwFocus, setpwFocus] = useState(false);

  const [matchpw, setMatchpw] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
      }, [email])

  useEffect(() => {
      setValidpw(PW_REGEX.test(pw));
      setValidMatch(pw === matchpw);
      }, [pw, matchpw])

  useEffect(() => {
        setErrMsg('');
      }, [email, pw, matchpw])

    useEffect(() => {
            axios
                .get('http://localhost:8080/api/v1/auth/csrf')
                .then((response) => {
                    console.log(response);
                    if (response.data) {
                        window.sessionStorage.setItem(response.config.xsrfCookieName, response.data);
                        axios.defaults.headers.common[response.config.xsrfHeaderName] = response.data;
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert('Failed to fetch CSRF token');
                });
      }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const v1 = EMAIL_REGEX.test(email);
      const v2 = PW_REGEX.test(pw);
      if (!v1 || !v2){
        setErrMsg("invalid Entry");
        return;
      }
    
      try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/register',
        JSON.stringify({
          "email":document.getElementById('email').value,
          "name":document.getElementById('name').value,
          "password":document.getElementById('password').value,
          "picture":"picture.somewhere"
        }), 
        {
          headers: {
              'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
      console.log("data:",response.data);
      console.log("response:",response.data.token);
      console.log(JSON.stringify(response));

      setEmail('');
      setpw('');
      setMatchpw('');
      } catch (err) {
        if (!err.response) {
          setErrMsg('Server response Not')
        } else if (err.response?.status === 409){
          setErrMsg('usename Taken')
        } else{
        setErrMsg('Registration failed.');
        }
        errRef.current.focus()
      }
      router('/login')
      alert("Success")
    };


    return (
      <div tw="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div tw="sm:mx-auto sm:w-full sm:max-w-sm">
          <a href="/">
            <span tw="sr-only">Our Jinro</span>
            <img tw="mx-auto h-12 w-auto" src="../../logo.png" alt="" />
          </a>
          <h2 tw="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Join OurRealRoad
          </h2>
        </div>
  
        <div tw="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          <form tw="space-y-4" onSubmit={handleSubmit} >
            <div>
              <label
                htmlFor="email"
                tw="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
                {validEmail ? <FontAwesomeIcon icon={faCheck} tw="text-green-600 ml-2" /> : null}
                {!validEmail && email ? <FontAwesomeIcon icon={faTimes} tw="text-red-600 ml-2" /> : null}
                <div tw="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    ref={emailRef}
                    autoComplete="email"
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail? "false" : "true"}
                    aria-describedby='uidnote'
                    onFocus={()=>setEmailFocus(true)}
                    onBlur={()=>setEmailFocus(false)}
                    tw="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                    {
                        emailFocus && email && !validEmail 
                        ? <p id="uidnote" tw="text-red-600 ml-2">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            ID @ MAIL . COM 형식으로 작성해주세요. <br />
                          </p>
                        : null
                    }
                </div>
              </label>
            </div>
  
            <div>
              <label
                htmlFor="password"
                tw="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
                {validpw ? <FontAwesomeIcon icon={faCheck} tw="text-green-600 ml-2" /> : null}
                {!validpw && pw ? <FontAwesomeIcon icon={faTimes} tw="text-red-600 ml-2" /> : null}
                <div tw="mt-2">
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setpw(e.target.value)}
                  value={pw}
                  required
                  aria-invalid={validpw ? "false" : "true"}
                  aria-describedby="pwnote"
                  onFocus={() => setpwFocus(true)}
                  onBlur={() => setpwFocus(false)}
                  tw="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"

                  />
                                      {
                        pwFocus && pw && !validpw 
                        ? <p id="uidnote" tw="text-red-600 ml-2">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            문자+숫자 8글자이상 적어주세요. <br />
                          </p>
                        : null
                    }

                </div>
              </label>
            </div>
  
            <div>
              <label
                htmlFor="password_confirm"
                tw="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
                {validMatch && validpw ?<FontAwesomeIcon icon={faCheck} tw="text-green-600 ml-2" /> : true}
                {!validMatch && matchpw ? <FontAwesomeIcon icon={faTimes} tw="text-red-600 ml-2" /> :null}
                <div tw="mt-2">
                <input
                  type="password"
                  id="confirm_pw"
                  onChange={(e) => setMatchpw(e.target.value)}
                  value={matchpw}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                  tw="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"

                  />
                                      {
                        matchFocus && matchpw && !validMatch
                        ? <p id="uidnote" tw="text-red-600 ml-2">
                            <FontAwesomeIcon icon={faInfoCircle} />
                            비밀번호가 일치하지 않습니다. <br />
                          </p>
                        : null
                    }
                </div>
              </label>
            </div>
  
            <div>
              <label
                htmlFor="name"
                tw="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
                <div tw="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    tw="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </label>
            </div>
  
            <div>
            <button
              type="submit"
              disabled={!email || !validEmail || !pw || !validpw || !matchpw || !validMatch}

              tw="flex w-full justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              Sign up
            </button>

            </div>
          </form>
  
          <p tw="mt-10 text-center text-sm text-gray-500">
            이미 계정이 있으세요?{' '}
            <a
              href="/login"
              tw="font-semibold leading-6 text-sky-600 hover:text-sky-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    );
  }
  
  export default Register;