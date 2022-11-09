export const verifyRoles = (...allowedRoles) => { //allowedRoles are any number of roles that i pass when i call this
    return (req, res, next ) => {
   
        if(!req?.roles) return res.sendStatus(401);

        const authorizedRoles = [... allowedRoles];
        const currentUserRoles = req.roles;
        console.log("authorized roles: ", authorizedRoles)
        console.log("user Roles: ",currentUserRoles)
        const result = currentUserRoles 
            .map(role => authorizedRoles.includes(role)) //return true for each user role that is authorized
            .find (val => val===true) // find if any of the values is true
        
        if (!result) return res.sendStatus(401);
        next();
    }
}