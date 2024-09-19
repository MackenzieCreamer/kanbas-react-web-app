import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/React.png" width={200} />
            <div>
              <h5>
                 CS1234 React JS
              </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/FGInsignia.png" width={200} />
            <div>
              <h5>
                 CS1212 Digital Art
              </h5>
              <p className="wd-dashboard-course-title">
                Personal Digital Art Creation 
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/MechaSkinkObject.png" width={200} />
            <div>
              <h5>
                 CS2212 Digital Art II
              </h5>
              <p className="wd-dashboard-course-title">
                Personal Digital Art Creation II
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/smoothBrain.png" width={200} />
            <div>
              <h5>
                CS3212 Digital Art III
              </h5>
              <p className="wd-dashboard-course-title">
                Personal Digital Art Creation III
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/html.png" width={200} />
            <div>
              <h5>
                 CS1232 HTML 
              </h5>
              <p className="wd-dashboard-course-title">
                Web Development (HTML Only)
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/wallp-js.png" width={200} />
            <div>
              <h5>
                 CS1233 JS
              </h5>
              <p className="wd-dashboard-course-title">
                Javascript Development (only JS)
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/Rust.png" width={200} />
            <div>
              <h5>
                 CS4234 Rust
              </h5>
              <p className="wd-dashboard-course-title">
                Rust Development Course
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
