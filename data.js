let id = 1;

function newId(){
    return id++;
}

const guitars =  [
    {id:newId(),make:'amba',model:'lala'},
    {id:newId(),make:'tukam',model:'mama'},
    {id:newId(),make:'busing',model:'dikidiki'},
]

export const getGuitars = () => guitars;
export function saveGuitar(guitar){
    guitar.id = newId();
    guitars.push(guitar);

}

export function deleteGuitar(id){
    let index = guitars.findIndex(g => g.id == id);

    guitars.splice(index,1);
}