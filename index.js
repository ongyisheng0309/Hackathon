import {createServer} from 'http';
import {deleteGuitar,getGuitars,saveGuitar} from './data.js';
import { createList,getGuitarContent,view,getForm } from './content.js'; // take all tih
import { parse } from 'querystring';
import { readFile } from 'fs/promises';
//create a server
const server = createServer(async(request,response) => {
    //action to delete the list
    const parts = request.url.split('/');
    const guitars = getGuitars();


    if(request.method === 'POST'){
        let body = '';
        request.on('readable',() =>{
            const data = request.read();        //make the request is readable


            if (data != null)
            {
                body += data;
            }
        });
        request.on('end', () => {
            const guitar = parse(body);

            saveGuitar({
                make: guitar.guitar_make,
                model:guitar.guitar_model
            });
            redirect(response,'/');

        })
    }
    else{
        //delete list
        if(parts.includes('delete')){
            handleDelete(parts[2]);
            redirect(response,'/');
        }else if(request.url === '/assets/css/style.css'){
            try {
                const cssFileName = './public/assets/css/style.css';
                const css = await readFile(cssFileName,{encoding: 'utf8'});
                response.end(css);
            }catch(err){
                response.statusCode = 404;
                response.end();
            }

        }
        else{

            //the purpose of this line is to let  the html to follow the default sheet style its not only plain text
            response.writeHead(200,{'Content-Type': 'text/html; charset = utf-8'});

            const url = new URL(request.url,'http://localhost'); // add more details if there's more daughter links 
            const id = url.searchParams.get('id');
            let content = ' ';

            //add
            if(parts.includes('add')){
                content = getForm();
            }else if(id){
                let guitar = guitars.find(g => g.id == id);
                content = getGuitarContent(guitar);
            }else{
                content = createList(guitars);
            }

            
            response.end(view(content));

        }
}
});


function handleDelete(id){
    deleteGuitar(id);
}

function redirect(response,to){

response.writeHead(302,{location: to ,'Content-Type': 'text/plain'});
response.end(`Redirect to ${to}`);
}

server.listen(80,() => {
    //this is to test does the server is listening
    console.log(`Server is listening at http://localhost:${server.address().port}`);

}); //portnumber like 80/443SS