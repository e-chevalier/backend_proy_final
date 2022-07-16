import logger from "../../../utils/logger/winston_config.js"

class Logout {

    async getLogout(req) {

        try {

            let username = req.user?.username

            if (req.session) {

                req.logOut()

                req.session.destroy(error => {
                    if (!error) {
                        //res.json({ status: "Logout OK" })
                        logger.info(`{ status: "Logout OK - ${username}" }`)

                    } else {
                        //res.json({ status: "Logout Error", body: error })
                        logger.error(`{ status: "Logout Error - ${username}", body: error }`)
                    }
                })
            }

            return { status: "LOGOUT OK" , username: username}

        } catch (error) {
            logger.error(error);
        }

    }


}

export let logoutService = new Logout()