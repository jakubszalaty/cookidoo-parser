'use strict'

    ; (function () {
        // Need add Authorization value from headers after login
        const bearer = 'Bearer [-----]'
        const headers = new Headers()
        headers.append('Authorization', bearer)
        /**
         * @type RequestInit
         */
        const init = {
            method: 'GET',
            headers: headers,
            mode: 'cors',
            cache: 'default'
        }

        const url = 'https://cookidoo.pl/vorwerkApiV2/apiv2/browseRecipe?limit=1455'
        fetch(url, init)
            .then(response => {
                return response.text()
            })
            .then(text => {
                const jsonObj = JSON.parse(text)
                const data = _.map(jsonObj.content, (elem) => {
                    const selfLink = _.find(elem.links, (e) => e.rel === 'self')
                    const id = selfLink.href.match(/[0-9]+$/)[0]
                    const link = `https://cookidoo.pl/vorwerkWebapp/app#/recipe/${id}`
                    return { name: elem.name, link: link }
                })
                // @TODO: copy to clipboard
                const body = document.querySelector('body')
                body.textContent = JSON.stringify(data, null, 4)
            })
            .catch(err => {
                console.error(err)
            })

    })()
