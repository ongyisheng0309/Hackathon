
export const createList =(guitars) => `

<h2>My GUitars<a href="/add">Add New Guitar </h2>
        <ul>
        ${guitars.map(createListItem).join('\n')}
        </ul>
`;

export const getForm = () => `
    <form method="post" action="/save">
    <div>
        Make: <input type="text" name="guitar_make" />
    </div>
    <div>
        Model: <input type="text" name="guitar_model" />
    </div>
    <div>
        <button type="submit">Save</button>
    </div>
</form>
`;

 const createListItem = ({id,make,model})=> `<li><a href = "?id=${id}">${make}${model}</li>`; 


export function getGuitarContent(guitar){

    if (guitar){
        return `<h2>${guitar.make}${guitar.model}</h2>
        <p><a href = "/delete/${guitar.id}"> Delete </a></p>`
    }
    else
    return`<h2>The Guitar dosent exist. </h2>`;
}
//the css is added at link below
export const view = (content) => `
<!DOCTYPE html>
        <html lang ="en">
        <head>
        <meta charset = "UTF-8">
        <meta http-equiv="X-UA-Compatible" content ="IE=edge">
        <meta name ="viewport" content = "width=device-width,initial-scale=1.0">
        <title>Guitars</title>
        <link rel="stylesheet" href="/assets/css/style.css" /> 
        </head>
        <body>
            ${content}
        </body>
        </html>
        
        
`;
