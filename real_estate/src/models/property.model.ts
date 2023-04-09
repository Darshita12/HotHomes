export interface Property {
    _id: Number,
    proptype: string,
    buildingtype: string,
    price: String,
    address: {
        streetname: String,
        city: String,
        province: String,
        pincode: String
    },
    area: String,
    bed: Number,
    bath: Number,
    garage: String,
    storey: String,
    parking: Number,
    water: String,
    basement: String,
    description: String,
    cooling: String,
    heating: String,
    builtin: Number,
    status: String
    images?: String []
}
interface IFile {
    filename: string;
    filecontent: Buffer
    id: string

  }
export interface PropertyList{
    propertyList: Property [],
    filteredProperties: Property[]
    savedProperties: Number[]
    propertyId: Number,
    address: string,
    map: any,
    marker: any
    filters: {
        propertyType: string;
        bed: string;
        minprice:number;
        maxprice: number
        buildingType: string;
        storey:string;
        cities: string;
        bath: string;
      };
}

export interface PropertyDetailProps{
    id: string
}
export interface PropertyDetailState{
    propertyDetail: Property
    emi:EMICalculator
    files: File []
    uploadedFiles: IFile[]
    uploadedFilesByPropertyId: any
    file:any
}
export interface SavedPropertyState{
    savedProperties: Property []
    propertyids: Number[]
}
export interface EMICalculator{
    loanAmount: Number,
    interestRate:Number,
    loanTerm:Number,
    totalAmount: Number
    totalInterest: Number
    totalEmi:Number,
    displayChart: boolean
}
export interface AddBuilderState{
    name: string,
    email: string,
    password: string
}
export interface AddPropertyState{
    proptype: string,
    buildingtype: string,
    price: String,
    address: {
        streetname: String,
        city: String,
        province: String,
        pincode: String
    },
    area: String,
    bed: Number,
    bath: Number,
    garage: String,
    storey: String,
    parking: Number,
    water: String,
    basement: String,
    description: String,
    cooling: String,
    heating: String,
    builtin: Number,
    files: File[],
    message: String
}