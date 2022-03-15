import domains from './domains.json';
import request from 'request';

module Domain {
    /**
    * Check if an email domain is correct.
    * 
    * @param email - your full email address
    *
    * @returns true = domain is valid
    */
    export function check(email: string): boolean {
        return email.split('@').length === 2 ?
            !domains.includes(
                email.split('@').pop()!
            ) : false;
    }

    //TODO: 
    async function checkOnline(email: string): Promise<boolean> {
        console.log(
            await domainAvailability(email)
        )
        return true;
    }

    async function domainAvailability(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const API_KEY = 'at_BsxgOsp0CSG0tyQKJxbmBAeu9mmCI';
            const domain = email.split('@').pop();
            request.get(
                `https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${API_KEY}&domainName=${domain}&credits=DA&mode=DNS_AND_WHOIS`,
                {
                    json: true
                },
                (err, res, body) => err ? reject(err) : resolve(body)
            )
        });
    }
}

export default Domain;