import AdminRentalCard from './AdminRentalCard'

export default function RentalManager(props) {

    const { rentalData, setRentalData } = props
    console.log(rentalData)
    return (
        <>
            <p className="text-center">{rentalData.length > 0 ? `${rentalData[0].email}'s Rentals` : ""}</p>
            { rentalData.length > 0 ? rentalData.map((rental) => {
                return <AdminRentalCard key={rental.confirmation_id} rental={rental} rentalData={rentalData} setRentalData={setRentalData}/>}):
                "All bikes have been returned"}
        </>
    )
}