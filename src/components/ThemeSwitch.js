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
        <div class="wrapper">
      <input type="checkbox" id="hide-checkbox" checked={props.theme == "light" ? true : false} onChange={change_theme}/>
      <label for="hide-checkbox" class="toggle">
        <span class="toggle-button">
          <span class="crater crater-1"></span>
          <span class="crater crater-2"></span>
          <span class="crater crater-3"></span>   
          <span class="crater crater-4"></span>
          <span class="crater crater-5"></span>
          <span class="crater crater-6"></span>
          <span class="crater crater-7"></span>
        </span>
        <span class="star star-1"></span>
        <span class="star star-2"></span>
        <span class="star star-3"></span>
        <span class="star star-4"></span>
        <span class="star star-5"></span>
        <span class="star star-6"></span>
        <span class="star star-7"></span>
        <span class="star star-8"></span>
      </label>
    </div>
    );
}
export default ThemeSwitch;