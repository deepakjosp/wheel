import React from "react";
import { Avatar, Button, Checkbox, Tooltip } from "neetoui";

export default function ContactTable({
  selectedContactIds,
  setSelectedContactIds,
  contacts = [],
  onContactDelete,
}) {
  return (
    <div className="w-full px-4">
      <table className="nui-table nui-table--checkbox nui-table--actions">
        <thead>
          <tr className="text-left">
            <th className="w:auto text-tableTitle">
              <Checkbox
                checked={
                  selectedContactIds.length ===
                  contacts.map(contact => contact.id).length
                }
                onClick={() => {
                  const contactIds = contacts.map(contact => contact.id);
                  if (selectedContactIds.length === contactIds.length) {
                    setSelectedContactIds([]);
                  } else {
                    setSelectedContactIds(contactIds);
                  }
                }}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Contact Number</th>
            <th>Add to Basecamp</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => {
            return (
              <tr
                key={contact.id}
                className={"cursor-pointer bg-white hover:bg-gray-50"}
              >
                <td>
                  <Checkbox
                    checked={selectedContactIds.includes(contact.id)}
                    onClick={event => {
                      event.stopPropagation();
                      const index = selectedContactIds.indexOf(contact.id);
                      if (index > -1) {
                        setSelectedContactIds([
                          ...selectedContactIds.slice(0, index),
                          ...selectedContactIds.slice(index + 1),
                        ]);
                      } else {
                        setSelectedContactIds([
                          ...selectedContactIds,
                          contact.id,
                        ]);
                      }
                    }}
                  />
                </td>
                <td className="flex items-center">
                  <Avatar contact={contact} className="mr-2.5" />
                  {contact.name}
                </td>
                <td>{contact.email}</td>
                <td>{contact.department}</td>
                <td>{contact.contactNumber}</td>
                <td>
                  <Checkbox checked={contact.addToBaseCamp} />
                </td>
                <td className="flex">
                  <Tooltip content="Edit" position="bottom">
                    <Button
                      className="mr-2"
                      style="icon"
                      icon="ri-pencil-line"
                    />
                  </Tooltip>
                  <Tooltip content="Delete" position="bottom">
                    <Button
                      style="icon"
                      icon="ri-delete-bin-line"
                      onClick={() => {
                        setSelectedContactIds([contact.id]);
                        onContactDelete();
                      }}
                    />
                  </Tooltip>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
