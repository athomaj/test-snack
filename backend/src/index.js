'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    console.log("test");
    strapi.db.lifecycles.subscribe({
      models: ['plugin::users-permissions.user'],

      // your lifecycle hooks
      async afterCreate(event) {
        const { result, params } = event;
        let user = {}
        console.log(result)
        console.log('user created!')
        if (result) {
          console.log("trying to send")
          user = result

          const emailTemplate = {
            subject: 'User Sign-up',
          };

          await strapi.plugins.email.services.email.send({
            to: "jsluciani2b@gmail.com",
            toName: "Scott Agirs",
            subject: "Hey there! 👋",
            text: `User (<%= user.username %>) has signed up. 
            Please check the application dashboard for details.`,
            html: `<h1>User (<%= user.username %>) has signed up.</h1>
            <p>Please check the application dashboard for details.<p>`,
          });
        }

        //console.log(strapi.controller('api::project.signupNotif'))
        //await strapi.controller('api::project.signupNotif')
        //await strapi.api('projects').controller('signupNotif')
        //await request(`/api/signup-notification`);
        console.log("after email")
      },
    })
  },
};