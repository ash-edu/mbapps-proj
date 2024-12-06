const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, function(){
    console.log("server now started")
});

/*
What to work on:
GET for all staff
GET for a specific staff
POST for staff (new staff)
PUT for staff

Example for using an id:
For URL params
/book/:bookid

let bid = req.params.bookid;

//Getting data from POST that was sent via BODY
let obj = req.body;
*/

let staffData = [
    {
        id: 1,
        name: "John Smith",
        phone: "02 9988 2211",
        department: 1,
        address: {
            street: "1 Code Lane",
            city: "Javaville",
            state: "NSW",
            postcode: "0100",
            country: "Australia"
        }
    },
    {
        id: 2,
        name: "Sue White",
        phone: "03 8899 2255",
        department: 2,
        address: {
            street: "16 Bit Way",
            city: "Byte Cove",
            state: "QLD",
            postcode: "1101",
            country: "Australia"
        }
    },
    {
        id: 3,
        name: "Bob O'Bits",
        phone: "05 7788 2255",
        department: 3,
        address: {
            street: "8 Silicon Road",
            city: "Cloud Hills",
            state: "VIC",
            postcode: "1001",
            country: "Australia"
        }
    },
    {
        id: 4,
        name: "Mary Blue",
        phone: "06 4455 9988",
        department: 2,
        address: {
            street: "4 Processor Boulevard",
            city: "Appletson",
            state: "NT",
            postcode: "1010",
            country: "Australia"
        }
    },
    {
        id: 5,
        name: "Mick Green",
        phone: "02 9988 1122",
        department: 3,
        address: {
            street: "700 Bandwidth Street",
            city: "Bufferland",
            state: "NSW",
            postcode: "0110",
            country: "Australia"
        }
    }
]

const departments = [
    { id: 0, name: "General"},
    { id: 1, name: "Information Communications Technology" },
    { id: 2, name: "Finance" },
    { id: 3, name: "Marketing" },
    { id: 4, name: "Human Resources" }
]

// GET all staff, create endpoint at URL path /staff
app.get('/api/staff',(req,res) => {

    // Create new array to store meaningful staff data, shows staff dep names not just dep ids 
    const staffWithDeptName = staffData.map( staff => {
        // For each staff member, find their dep  
        const matchingDepartment = departments.find(dept => dept.id === staff.department);

        // Get dep name, use 'unknown' if it doesn't exist
        const departmentName = matchingDepartment ? matchingDepartment.name : 'Unknown';

        // Create new object with original staff data, now including dep name
        return {
            // id: staff.id,                    # expanded list
            // name: staff.name,
            // phone: staff.phone,
            // department: staff.department,
            // departmentName: departmentName,
            ...staff,                           // crazy concise w spread operator
            departmentName
        };
    });

    //send back improved staff data
    res.json(staffWithDeptName) 
});

// GET for a specific staff member, create endpoint at specific staffId
app.get('/api/staff/:staffId',(req,res) => {
    let staffId = parseInt(req.params.staffId);
    const matchingStaff = staffData.find( s => s.id === staffId);

    if(matchingStaff) {
        // Found staff member
        const matchingDepartment = departments.find(dept => dept.id === matchingStaff.department);
        const departmentName = matchingDepartment ? matchingDepartment.name : 'Unknown';

        res.json({
            // id: matchingStaff.id,        # expanded list
            // name: matchingStaff.name,    
            // phone: matchingStaff.phone,
            // department: matchingStaff.department
            ...matchingStaff,
            departmentName
        });
    } else {
        // No matching staff member found
        res.status(404).json({ message: "Staff member not found"});
    }
});

// GET all departments
app.get('/api/departments', (req, res) => {
    res.json(departments);
});

// POST for adding new staff member
app.post('/api/staff',(req,res) => {
    // Get new staff data from body
    let newStaff = req.body;

    // Basic validation for empty fields ?
    if (!newStaff.name || !newStaff.phone || !newStaff.department) {
        return res.status(400).json({
            message: "Missing required fields: name, phone, and department are required"
        });
    }

    // Validate department exists ?
    // Some() -- at least one element in array passes the test provided in func (so, if d.id matches newStaff dep id)
    // returns TRUE if callbackFn returns a truthy value for array element
    const DepartmentExists = departments.some( d => d.id === newStaff.department)
    if (!DepartmentExists){
        return res.status(400).json({ 
            message: "Invalid department ID"
        });
    };

    // Generate new staff id ?
    // return largest num found in staff id array + 1!
    const newId = Math.max(...staffData.map(staff => staff.id)) + 1;

    const staffToAdd = {
        id: newId,
        name: newStaff.name,
        phone: newStaff.phone,
        department: newStaff.department,
        address: {
            street: newStaff.address?.street || "",
            city: newStaff.address?.city || "",
            state: newStaff.address?.state || "",
            postcode: newStaff.address?.postcode || "",
            country: newStaff.address?.country || "Australia"   
        }
    };

    // Add to staff array
    staffData.push(staffToAdd);

    // Show new staff data, including department name
    const matchingDepartment = departments.find(dept => dept.id === newStaff.department) 
    const departmentName = matchingDepartment ? matchingDepartment.name : 'Unknown';

    res.status(201).json({
        ...staffToAdd,
        departmentName
    });
});

// PUT for updating existing staff
app.put('/api/staff/:staffId', (req,res) => {
    let staffId = parseInt(req.params.staffId);

    // Find the staff member's index in staff data array
    const staffMemberIndex = staffData.findIndex(s => s.id === staffId); // changed from find -> findIndex

    // Check if staff exists
    if (staffMemberIndex === -1) {              // findIndex() returns -1 if callbackFn never returns a truthy value 
        return res.status(404).json({           // bc valid req, but no ID found
            message: "staff member not found"
        });
    }

    // Get update data from request body
    let updateStaffData = req.body;

    // Basic validation
    if (!updateStaffData.name || !updateStaffData.phone || !updateStaffData.department){
        return res.status(400).json({
            message: "Missing required fields: name, phone, and department are required."
        }); 
    }

    // Validate department exists -- reused
    const DepartmentExists = departments.some( d => d.id === updateStaffData.department)
    if (!DepartmentExists){
        return res.status(400).json({ 
            message: "invalid dep id"
        });
    };

    // Create updated staff object, SAME ID!!!!
    const updatedStaffMember = {
        id: staffId,
        name: updateStaffData.name,
        phone: updateStaffData.phone,
        department: updateStaffData.department,
        address: {
            street: updateStaffData.address?.street || staffData[staffMemberIndex].address.street,
            city: updateStaffData.address?.city || staffData[staffMemberIndex].address.city,
            state: updateStaffData.address?.state || staffData[staffMemberIndex].address.state,
            postcode: updateStaffData.address?.postcode || staffData[staffMemberIndex].address.postcode,
            country: updateStaffData.address?.country || staffData[staffMemberIndex].address.country
        }
    };

    // Update the staff member in the array
    staffData[staffMemberIndex] = updatedStaffMember;
    
    // Get dep name again
    const matchingDepartment = departments.find(dept => dept.id === updatedStaffMember.department);
    const departmentName = matchingDepartment ? matchingDepartment.name : 'Unknown';

    // Return the updated staff member w res.json
    res.json({
        ...updatedStaffMember,
        departmentName
    });
});