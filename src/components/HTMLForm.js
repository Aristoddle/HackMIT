import React, {Component} from 'react';

export const renderDoc = function(user, items, rooms, userInfo) {

  var damaged_item = (
    <div>
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
          {items.map((value, index) => {
          return <tr>
              <td>
                  {index}
              </td>
              <td>
                  {value.name}
              </td>
              <td>
                  {value.description}
              </td>
              <td>
                  {value.features}
              </td>
          </tr>;
        })}
      </table></div>
  );

  var room_tables = rooms.map((room) => {

    return (<div>
      <h1 style="text-align:center">
        {room.roomName}: Damage Overview  {/* <-- the name of the room */}
    </h1>

  <div>
  <h2> Room Overview: </h2>
  <h3> Room Type: {room.roomType} </h3>
  <h3> Crown Molding?: {room.molding} </h3>
  <h3> Wall Covering Info: {room.wallCovering} </h3>
  <h3> Special Architectural Features: {room.special} </h3>
</div>
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
      {items.filter((item) => {return item.roomName == room.roomName}).map((value, index) => {
      return (<tr>
          <td>
              { index }
          </td>
          <td>
              { value.itemName }
          </td>
          <td>
              { value.itemType }
          </td>
          <td>
              { value.amazon }
          </td>
          <td>
              $100
          </td>
      </tr>);
    })}

      {/* Looping should end here */}
      <tr>
          <td>
              <b>Total Value:</b>
          </td>
          <td colspan="2"> </td>
          <td>
              $1000
          </td>
      </tr>
    </table>
  </div>)});

  var html = (<div>
        {/* here, I want to pull the User Info: email, address, name, etc*/}

        <div>
        <h1 style="text-align:center">
            Overall Claim Information  {/* <-- the name of the room */}
        </h1>

        <h3> Client: {user.name} </h3>
        <h3> Property: {user.address} {user.city} {user.state} {user.zip} </h3>
        <h3> Client Phone: {user.phone} </h3>


        <h3> Estimator: Samuel Sample </h3>
        <h3> Company: {user.insuranceCompany} </h3>
        <h3> Business Address: 345 Chubb Rd, Warren Township, NJ </h3>
        <h3> Phone: 1-555-878-9321 </h3>

        <h3> Date of Incident: December 21, 2018 </h3>
        <h3> Incident Type: {user.disaster} </h3>
        <h3> Insurance Number: 1206678345 </h3>
        </div>

        {/*  Here, I need value to be the list of 'room's defined above*/}

      {room_tables}

      {damaged_item}
    </div>);
  }
