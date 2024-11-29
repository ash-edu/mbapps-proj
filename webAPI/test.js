// test staff list with just names and department IDs
const testStaff = [
    { name: "Alice", departmentId: 1 },
    { name: "Bob", departmentId: 2 },
    { name: "Charlie", departmentId: 1 },
    { name: "Sam", departmentId: 3 },

];

// test departments list
const testDepartments = [
    { id: 1, name: "Sales" },
    { id: 2, name: "Engineering" },
    { id: 3, name: "Finance" }
];

// map over staff and add department names
const staffWithDepts = testStaff.map(person => {
    // Find person's department
    const dept = testDepartments.find(d => d.id === person.departmentId);
    
    // Return new object with department name added
    return {
        ...person,
        departmentName: dept ? dept.name : 'Unknown'
    };
});
console.log(staffWithDepts);

// .find method
const foundDept = testDepartments.find( d => d.id === 3);
console.log(foundDept);

/* 1. method, expanded and heaps verbose
// GET all staff, create endpoint at URL path /staff
app.get('/staff',(req,res) => {

    // Create new array to store meaningful staff data, shows staff dep names not just dep ids 
    const staffWithDeptName = staffData.map( staff => {
        // For each staff member, find their dep  
        const matchingDepartment = departments.find( dept => {
            return dept.id === staff.department;
        });

        // Get dep name, use 'unknown' if it doesn't exist
        let departmentName;
        if (matchingDepartment) {
            departmentName = matchingDepartment.name;
        } else {
            departmentName = 'unknown';
        }

        // Create new object with original staff info, now including dep name
        return {
            id: staff.id,
            name: staff.name,
            phone: staff.phone,
            department: staff.department,
            departmentName: departmentName,
        }
    })

    //send back improved staff data
    res.json(staffWithDeptName) 
});
*/

/*
// POST endpoint for adding new staff
app.post('/api/staff', (req, res) => {
    // Get the new staff data from request body
    const newStaff = req.body;

    // Basic validation
    if (!newStaff.name || !newStaff.phone || !newStaff.department) {
        return res.status(400).json({ 
            message: "Missing required fields: name, phone, and department are required"
        });
    }

    // Validate department exists
    const departmentExists = departments.some(dept => dept.id === newStaff.department);
    if (!departmentExists) {
        return res.status(400).json({ 
            message: "Invalid department ID" 
        });
    }

    // Generate new ID (find highest current ID and add 1)
    const newId = Math.max(...staffData.map(staff => staff.id)) + 1;

    // Create new staff object with generated ID
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
            country: newStaff.address?.country || "Australia" // Default to Australia
        }
    };

    // Add to staff array
    staffData.push(staffToAdd);

    // Return the newly created staff member with department name
    const matchingDepartment = departments.find(dept => dept.id === staffToAdd.department);
    const departmentName = matchingDepartment ? matchingDepartment.name : 'Unknown';

    res.status(201).json({
        ...staffToAdd,
        departmentName
    });
});
*/