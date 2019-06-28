import axios from 'axios';

export function configureFakeBackend() {
    let users = [];
    let userRoles = [];
    let realFetch = window.fetch;

    axios.get(`http://localhost:3002/getUsers`)
      .then(response => users = response.data.reverse() );

      axios.get(`http://localhost:3002/getUserRoles`)
      .then(response => userRoles = response.data.reverse() );

    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.user_email === params.username && user.user_password === params.password;
                    });

                    if (filteredUsers.length) {
                        let user = filteredUsers[0];

                        let filteredRoles = userRoles.filter(role => {
                            return role.user_id === user.userid ;
                        });

                        // if login details are valid return user details
                        let responseJson = {
                            id: user.userid,
                            email: user.user_email,
                            firstName: user.user_first_name,
                            lastName: user.user_last_name,
                            phone : user.user_phone,
                            address : user.user_address1,
                            role : filteredRoles[0].roles
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security 
                    // is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === `Basic ${window.btoa('test:test')}`) {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users)) });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        resolve({ status: 401, text: () => Promise.resolve() });
                    }

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}