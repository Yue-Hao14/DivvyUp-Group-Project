import React from "react";
import "./Footer.css"
import { useSelector } from "react-redux"

function Footer() {
  const sessionUser = useSelector(state => state.session.user)
  const footerClass = sessionUser ? "" : "logged_out_footer"

  return (
    <footer className={`footer_container ` + footerClass}>
      <div className="about_us_title_container">
        <div className="about_us_title">About Us</div>
      </div>
      <div className="about_us_container">
        <div className="project_repo_container">
          <div className="project_repo_title">Project Repo</div>
            <a href="https://github.com/Yue-Hao14/DivvyUp-Group-Project" target="_blank" rel="noreferrer">
              <i className="contact_us_github_icon fa-brands fa-github" />
            </a>
        </div>
        <div className="about_us_dev_container">
          <div className="about_us_dev_name">Nick Arakaki</div>
          <div className="about_us_dev_contact_links">
            <a href="https://www.linkedin.com/in/nicholas-arakaki-10aa66149" target="_blank" rel="noreferrer">
              <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
            </a>
            <a href="https://github.com/NickArakaki" target="_blank" rel="noreferrer">
              <i class="contact_us_github_icon fa-brands fa-github" />
            </a>
          </div>
        </div>
        <div className="about_us_dev_container">
          <div className="about_us_dev_name">Troy Lee</div>
          <div className="about_us_dev_contact_links">
            <a href="https://www.linkedin.com/in/troy-lee-1603ba159/" target="_blank" rel="noreferrer">
              <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
            </a>
            <a href="https://github.com/troybloy" target="_blank" rel="noreferrer">
              <i class="contact_us_github_icon fa-brands fa-github" />
            </a>
          </div>
        </div>
        <div className="about_us_dev_container">
          <div className="about_us_dev_name">Yue Hao</div>
          <div className="about_us_dev_contact_links">
            <a href="https://www.linkedin.com/in/yue-hao/" target="_blank" rel="noreferrer">
              <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
            </a>
            <a href="https://github.com/Yue-Hao14" target="_blank" rel="noreferrer">
              <i class="contact_us_github_icon fa-brands fa-github" />
            </a>
          </div>
        </div>
        <div className="about_us_dev_container">
          <div className="about_us_dev_name">Tuan Tran</div>
          <div className="about_us_dev_contact_links">
            <a href="https://www.linkedin.com/in/tuan-tran-163853117/" target="_blank" rel="noreferrer">
              <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
            </a>
            <a href="https://github.com/kutun0901" target="_blank" rel="noreferrer">
              <i class="contact_us_github_icon fa-brands fa-github" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
