import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";
import {createAccountPage, loginPage, websiteTitle} from "../../const";
import ErrorIcon from '@mui/icons-material/Error';
import "./errorPage.css"
import {PestControlOutlined} from "@mui/icons-material";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";

const margin = "5vw";
let intervals = [];

let useStyles = makeStyles({
    walkingBug: {
        position: "absolute",
        bottom: margin,
        left: margin,
        fontSize: "8vh !important",
        transform: "rotate(90deg)"
    }
});

const ErrorPage = () => {
    const idWalkingBug = "walking-bug";
    const classes = useStyles();

    let interval = setInterval(function () {
        let initialMargin = parseInt(margin.split("vw")[0]) * 2;
        let differenceRotation = 15;

        let bug = document.getElementById(idWalkingBug);
        bug.style.left = bug.style.left === "" && margin;
        bug.style.transform = bug.style.transform === "" && "rotate(90deg)";

        let beforeLeft = parseInt(bug.style.left.split("vw")[0]);
        let beforeRotation = bug.style.transform;

        let afterLeft, sign;
        if (beforeRotation.split("-").length === 1) {  // we are going right
            afterLeft = beforeLeft < 100 - initialMargin ? beforeLeft + 1 : beforeLeft - 1;
            sign = afterLeft > beforeLeft ? "" : "-";
        } else { // we are going left (going back)
            afterLeft = beforeLeft > initialMargin / 2 ? beforeLeft - 1 : beforeLeft + 1;
            sign = afterLeft < beforeLeft ? "-" : "";
        }
        bug.style.left = `${afterLeft}vw`;

        let rotation = 90;
        switch (afterLeft % 3) {
            case 0:
                rotation -= differenceRotation;
                break;
            case 2:
                rotation += differenceRotation;
                break;
            default:
                break;
        }
        bug.style.transform = `rotate(${sign}${rotation}deg)`;
    }, 150);
    intervals.push(interval);

    return (
        <div id={"error-page"}>
            <div className={"website-title"} id={"website-title-login"} style={{marginLeft: margin}}>
                <BugReportOutlinedIcon fontSize={"large"}/>
                <span>{websiteTitle}</span>
            </div>
            <div id={"container"}>
                <ErrorIcon htmlColor={"white"} id={"error-icon"}/>
                <p>Oops.. This worked fine when I tested it... </p>
                <p>
                    Try&nbsp;
                    <Link
                        to={loginPage}
                        className={"link-error-page"}
                        onClick={() => intervals.forEach(i => clearInterval(i))}
                    >
                         logging in&nbsp;
                    </Link>
                    or&nbsp;
                    <Link
                        to={createAccountPage}
                        className={"link-error-page"}
                        onClick={() => intervals.forEach(i => clearInterval(i))}
                    >
                         create an account&nbsp;
                    </Link>
                    if you don't have one already
                </p>
            </div>
            <PestControlOutlined htmlColor={"white"} className={classes.walkingBug} id={idWalkingBug}/>
        </div>
    )
};

export default ErrorPage;