import '../styles/ThemeSwitch.css'

const ThemeSwitch = (props) => {
  const change_theme = (e) => {
    if(e.target.checked == false) {
      console.log("fds")
      props.setTheme("dark")
      document.querySelector("body").setAttribute("data-theme","dark")
      localStorage.setItem("theme","dark")
    } else {
      props.setTheme("light")
      document.querySelector("body").setAttribute("data-theme","light")
      localStorage.setItem("theme","light")
    }
  }
    return (
        <div className="wrapper">
      <input type="checkbox" id="hide-checkbox" checked={props.theme == "light" ? true : false} onChange={change_theme}/>
      <label htmlFor="hide-checkbox" className="toggle">
        <span className="toggle-button">
          <span className="crater crater-1"></span>
          <span className="crater crater-2"></span>
          <span className="crater crater-3"></span>   
          <span className="crater crater-4"></span>
          <span className="crater crater-5"></span>
          <span className="crater crater-6"></span>
          <span className="crater crater-7"></span>
        </span>
        <span className="star star-1"></span>
        <span className="star star-2"></span>
        <span className="star star-3"></span>
        <span className="star star-4"></span>
        <span className="star star-5"></span>
        <span className="star star-6"></span>
        <span className="star star-7"></span>
        <span className="star star-8"></span>
      </label>
    </div>
    );
}
export default ThemeSwitch;