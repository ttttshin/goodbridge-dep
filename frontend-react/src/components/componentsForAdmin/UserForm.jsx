import { React, useState } from "react"; 
import { useUsersContext } from "../../hooks/useUsersContext";
import csc from "country-state-city";
import { useFormik } from "formik";
import Select from "react-select";

const UserForm = () => {
    const {dispatch} = useUsersContext();
    const interests = [
        "Climate Justice",
        "Feminism",
        "Disability Rights",
        "LGBTQIA+ Rights",
        "Mental Health",
        "Poverty Eradication",
        "Reproductive Rights",
        "Sexual Health",
        "Voting Rights",
    ];
    /*  "COVID19", 
        "Food Insecurity",
        "Homelessness",
        "Poverty Eradication",
        "Racial Justice",
        "Refugee Crisis",
        "Reproductive Rights",
        "Sexual Health",
        "Voting Rights",
        "Sustainability",
    */
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [error, setError] = useState(null);
    const addressFromik = useFormik({
        initialValues: {
          country: '',
          state: '',
          city: '',
        },
        onSubmit: (values) => console.log(JSON.stringify(values)),
    });

    const { values, setFieldValue } = addressFromik;

    //new logic for check box
    const handleInterestChange = (event) => {
        const { value, checked } = event.target;
        if (checked && selectedInterests.length < 5) {
            setSelectedInterests([...selectedInterests, value]);
        } else if (!checked) {
            setSelectedInterests(selectedInterests.filter((interest) => interest !== value));
        }
    };
    
    // Get countries, states, and cities data
    const countries = csc.getAllCountries();


    const updatedCountries = countries.map((country) => ({
        label: country.name,
        value: country.id,
        ...country,
    }));
    const updatedStates = (countryId) =>
        csc.getStatesOfCountry(countryId).map((state) => ({
        label: state.name,
        value: state.id,
        ...state,
        }));
    const updatedCities = (stateId) =>
        csc.getCitiesOfState(stateId).map((city) => ({
        label: city.name,
        value: city.id,
        ...city,
        }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const countrySelected = values.country;
        const citySelected = values.city;
        const location = [countrySelected.label, citySelected.label];
        
      
        const user = {name, email, bio, password, location, values:selectedInterests};

        const response = await fetch('/admin', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              'Content-Type': 'application/json'
            }
          });

        const json = await response.json();

        if(! response.ok){
            setError(json.error);
        }

        if(response.ok){
            setError(null);
            setName('');
            setBio('');
            setEmail('');
            setPassword('');
            console.log('new user has been added', json);
            dispatch({type:'CREATE_USER', payload: json}); 
        }
      
      };

    return(
    <form className="create space-y-4 bg-white p-4 rounded-lg shadow-2xl" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-bold mb-4 text-center">Add a new user</h3>
  
      <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
          id="userName"
          type="text"
          className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm h-8" // Increased height
          onChange={(e) => setName(e.target.value)}
          value={name}
          />
      </div>
  
      <div>
          <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
          id="userEmail"
          type="email"
          className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm h-8" // Increased height
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          />
      </div>
  
      <div>
          <label htmlFor="userBio" className="block text-sm font-medium text-gray-700">Bio:</label>
          <input
          id="userBio"
          type="text"
          className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm h-8" // Increased height
          onChange={(e) => setBio(e.target.value)}
          value={bio}
          />
      </div>
  
      <div>
          <label htmlFor="userPassword" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
          id="userPassword"
          type="password"
          className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm h-8" // Increased height
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          />
      </div>

            <div>
                <label htmlFor="userCountry" className="block text-sm font-medium text-gray-700">Country:</label>
                    <Select
                        id="country"
                        name="country"
                        className="rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2"
                        options={updatedCountries}
                        value={values.country}
                        onChange={(value) => setFieldValue("country", value)}
                    />
            </div>

            {/* State Selector */}
            <div>
                <label htmlFor="userState" className="block text-sm font-medium text-gray-700">State:</label>
                <Select
                    id="state"
                    name="state"
                    className="rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2"
                    options={updatedStates(values.country ? values.country.value : null)}
                    value={values.state}
                    onChange={(value) => setFieldValue("state", value)}
                />
            </div>

            {/* City Selector */}
            <div>
                <label htmlFor="userCity" className="block text-sm font-medium text-gray-700">City:</label>
                <Select
                    id="city"
                    name="city"
                    className="rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-2"
                    options={updatedCities(values.state ? values.state.value : null)}
                    value={values.city}
                    onChange={(value) => setFieldValue("city", value)}
                />
            </div>

            <div data-testid="valuesInput">
                <label  className="block text-sm font-medium text-gray-700">Values (Select up to 5):</label>
                <div className="mt-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {interests.map((interest) => (
                        <div key={interest}>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    value={interest}
                                    onChange={handleInterestChange}
                                    checked={selectedInterests.includes(interest)}
                                />
                                <span className="ml-2 text-gray-700">{interest}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
    
  
      <button type="submit" className="submit w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-DarkGreen hover:bg-red focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-DarkGreen">Add user</button>
      {error && 
        <div  className="bg-lightred rounded w-full flex justify-center items-center h-fit border border-red px-1">
            <div className='error text-red text-sm'>
                <strong>{error}</strong>
            </div>
        </div>
      }
  </form>
  
    );


};
export default UserForm; 