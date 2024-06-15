import styles from "./styles.module.scss";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { useState, useMemo } from "react";
import {
  testUser,
  testUserInfo,
  extraUserInfo,
  scheduleInfo,
} from "../../utils/mock-data";
import { useAppDispatch, useAppSelector } from "../../service/store";
import { loginFailure, loginSuccess } from "../../service/slices/authSlice";
import {
  getAuthStatus,
  getCurrentLang,
  getLoginError,
} from "../../service/selectors";
import showIcon from "../../images/show_password.svg";
import { toggleLangEng, toggleLangRu } from "../../service/slices/langSlice";

export default function LoginPage() {
  const useSelector = useAppSelector;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const lang = useAppSelector(getCurrentLang);
  const loginError = useSelector(getLoginError);
  const isAuthenticated = useSelector(getAuthStatus);
  const location = useLocation();

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLangChange = () => {
    if (lang === "RU") {
      dispatch(toggleLangEng());
    } else if (lang === "EN") {
      dispatch(toggleLangRu());
    }
  };

  const activeStyle = {
    color: "#7362BC",
    fontSize: "40px",
  };

  const textContent = useMemo(() => {
    return {
      title: lang === "RU" ? "Вход в Sirius Future" : "Login to Sirius Future",
      emailPlaceholder: lang === "RU" ? "Электронная почта" : "E-mail",
      passwordPlaceholder: lang === "RU" ? "Пароль" : "Password",
      rememberMe: lang === "RU" ? "Запомнить меня" : "Remember me",
      loginButton: lang === "RU" ? "Войти" : "Login",
      forgotPassword: lang === "RU" ? "Я забыл пароль" : "Forgot Password",
      loginAsTrainer: lang === "RU" ? "Войти как тренер" : "Login as Trainer",
      noAccount: lang === "RU" ? "Нет аккаунта?" : "Don't have an account?",
      register: lang === "RU" ? "Зарегистрироваться" : "Register",
      error: lang === "RU" ? "Неверный логин или пароль" : "Invalid email or password",
    };
  }, [lang]);

  // Imitation of backend request
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = testUser.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      dispatch(
        loginSuccess({
          userInfo: testUserInfo,
          extraUserInfo: [extraUserInfo],
          scheduleInfo: scheduleInfo,
        })
      ); // The data is passed here only to imitate backend response and update store data
      navigate("/user");
    } else {
      dispatch(loginFailure(textContent.error));
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/user"} state={{ from: location }} />;
  }

  return (
    <section className={styles.login_section}>
      <div className={styles.login_container}>
        <img src={logo} alt="Sirius Future Logo" />
        <h1 className={styles.login_title}>{textContent.title}</h1>
        <form className={styles.login_form} onSubmit={handleSubmit}>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              name="email"
              placeholder={textContent.emailPlaceholder}
              className={styles.login_data}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className={styles.login_data__label} htmlFor="password">
            <input
              placeholder={textContent.passwordPlaceholder}
              className={styles.login_data}
              value={password}
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              type={isPasswordVisible ? "text" : "password"}
              required
            />

            <span
              className={styles.password_toggle_icon}
              onClick={handlePasswordVisibility}
            >
              <img src={showIcon} alt="Toggle Password Visibility" />
            </span>
          </label>

          <label
            className={styles.login_remember_me_label}
            htmlFor="rememberMe"
          >
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <p className={styles.login_remember_me}>{textContent.rememberMe}</p>
          </label>

          <p className={styles.login_error}>{loginError}</p>

          <button
            type="submit"
            className={styles.login_button}
            disabled={!email || !password}
          >
            {textContent.loginButton}
          </button>
        </form>

        <div className={styles.login_options}>
          <Link to="#" className={styles.login_option}>
            {textContent.forgotPassword}
          </Link>
          <Link to="#" className={styles.login_option}>
            {textContent.loginAsTrainer}
          </Link>
        </div>
      </div>

      <div className={styles.login_no_data_wrapper}>
        <p className={styles.login_no_data}>{textContent.noAccount}</p>
        <Link to="#" className={styles.login_no_data_register}>
          {textContent.register}
        </Link>
      </div>

      <div className={styles.login_lang_wrapper}>
        <button
          type="button"
          className={styles.login_lang}
          style={lang === "RU" ? activeStyle : {}}
          onClick={handleLangChange}
        >
          RU
        </button>
        <button
          type="button"
          className={styles.login_lang}
          style={lang === "EN" ? activeStyle : {}}
          onClick={handleLangChange}
        >
          EN
        </button>
      </div>
    </section>
  );
}
