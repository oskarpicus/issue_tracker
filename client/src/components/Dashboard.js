const Dashboard = ({loggedUser}) => {
    if (loggedUser === undefined) {
        // todo replace with a dedicated page
        return <p>You are not logged in</p>
    }
    return (
        <p>Hello {loggedUser.firstName} {loggedUser.lastName}</p>
    )
};

export default Dashboard
