// DonorsPage.tsx or .jsx
import { useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { client } from "../app/clinet"; // your configured Thirdweb client
import { useEffect, useState } from "react";
import { sepolia,defineChain } from "thirdweb/chains";


const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0xEfA93B667ADaDD20e309A7C45C37802c3055840D",
});





export default function DonorsPage() {
  const { data, isLoading,error } = useReadContract({
    contract,
    method:
      "function getApprovedDonors() view returns ((string name, uint8 age, string bloodGroup, string city, bool approved, address registeredBy)[])",
    params: [],
  });
console.log(data)


  /*const { data, isLoading, error } = useReadContract({
    contract,
    method:
      "function getApprovedDonors() view returns ((string name, uint8 age, string bloodGroup, string city, bool approved, address registeredBy)[])",
    params: [],
  });*/

  //console.log(data)
  //console.log(isLoading)
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    if (data) setDonors(data);
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading donors.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Approved Donors</h1>
      {donors.length === 0 ? (
        <p>No approved donors yet.</p>
      ) : (
        <ul>
          {donors.map((donor, idx) => (
            <li key={idx} className="mb-2 border-b pb-2">
              <p><strong>Name:</strong> {donor.name}</p>
              <p><strong>Age:</strong> {donor.age}</p>
              <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
              <p><strong>City:</strong> {donor.city}</p>
              <p><strong>Registered By:</strong> {donor.registeredBy}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
