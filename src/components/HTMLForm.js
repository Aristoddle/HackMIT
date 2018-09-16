var item = {
    userEmail: '',
    roomName: '',
    roomType: '',
    itemName: '',
    itemType: '',
    description: '',
    date: '',
    amazon: '',
    features: '',
    price: '',
};

var room = {
    userEmail: '',
    roomName: '',
    roomType: '',
    molding: '',
    wallCovering: '',
    special: '',
  };

var userinfo = {
    walls: '',
    roof: '',
    cost: '',
    footage: '',
    rooms: '',
  };

render() {
    return (<div>
        
        {/*  Here, I need value to be the list of 'room's defined above*/}
        {this.room.map((value, index) => (

        <h1 style="text-align:center">
            {value.roomName}: Damage Overview  {/* <-- the name of the room */}
        </h1>

        <h2> Room Overview: </h2>
        <h3> Room Type: {value.roomType} </h3>
        <h3> Molding: {value.molding} </h3>
        <h3> Wall Covering: {value.wallCovering} </h3>
        <h3> Special: {value.special} </h3>

        <h2> Damaged Item Overview: </h2>
        <table>
            <tr>
                <th>
                    Item ID
                </th>
                <th>
                    Item Name
                </th>
                <th>
                    Item Type
                </th>
                <th>
                    Online Purchase Link
                </th>
                <th>
                    Item Price
                </th>
            </tr>

            {/* Pull a list of items in a room, iterate thru the list */}
            {this.room.map((value, index) => (
            <tr>
                <th>
                    { index }
                </th>
                <th>
                    { value.name }
                </th>
                <th>
                    { value.type }
                </th>
                <th>
                    { value.amazon }
                </th>
                <th>
                    { value.price }
                </th>
            </tr>

            {/* Looping should end here */}
            <tr>
                <th>
                    Total Value:
                </th>
                <th colspan="2"> </th>
                <th>
                    { sum({/* Price of all items in a room */}) }
                </th>
            </tr>
            );

        </table>

        <h2> Damaged Item Detail </h2>
        <table>
            <tr>
                <th>
                    Item ID
                </th>
                <th>
                    Item Name
                </th>
                <th>
                    Item Description
                </th>
                <th>
                    Item Features
                </th>
            </tr>

            {/* Pull a list of items in a room, iterate thru the list */}
            {this.room.map((value, index) => (
            <tr>
                <th>
                    {index}
                </th>
                <th>
                    {value.name}
                </th>
                <th>
                    {value.description}
                </th>
                <th>
                    {value.features}
                </th>
            </tr>
        </table>

        )};
        </div>);
    }

{
    samp.map((value)=>{return;}
        <dic>
)
}


