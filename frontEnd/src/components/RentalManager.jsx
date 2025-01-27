import AdminRentalCard from './AdminRentalCard'

export default function RentalManager(props) {

    const { rentalData, setRentalData } = props
    console.log(rentalData)
    return (
        <>
            <p className="text-center">{rentalData[0].email}'s Rentals</p>
            { rentalData.map((rental) => {
                return <AdminRentalCard key={rental.confirmation_id} rental={rental} rentalData={rentalData} setRentalData={setRentalData}/>
            })}
        </>
    )
}