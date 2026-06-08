import { useState, useEffect } from 'react';
import axios from 'axios';

export const useServiceDropdowns = () => {
    const BASE_URL = 'http://localhost:5000';

    // Master list arrays fetched from DB
    const [serviceTypesList, setServiceTypesList] = useState([]);
    const [allMainCategories, setAllMainCategories] = useState([]);
    const [allSubCategories, setAllSubCategories] = useState([]);

    // Filtered lists for dropdown UI cascading
    const [currentCategoriesList, setCurrentCategoriesList] = useState([]);
    const [currentSubCategoriesList, setCurrentSubCategoriesList] = useState([]);

    const [formData, setFormData] = useState({
        serviceType: '',
        category: '',
        subCategory: '',
        name: '',
        price: '',
        tagline: '',
        features: '',
        description: ''
    });

    // Initial Data Fetch
    useEffect(() => {
        const fetchMasters = async () => {
            try {
                const [typesRes, catsRes, subsRes] = await Promise.all([
                    axios.get(`${BASE_URL}/api/master/service-types`),
                    axios.get(`${BASE_URL}/api/master/main-categories`),
                    axios.get(`${BASE_URL}/api/master/sub-categories`)
                ]);
                setServiceTypesList(typesRes.data);
                setAllMainCategories(catsRes.data);
                setAllSubCategories(subsRes.data);
            } catch (err) {
                console.error("Error loading structural master matrices:", err);
            }
        };
        fetchMasters();
    }, []);

    // Trigger when Service Type changes
    const handleTypeChange = (typeId) => {
        setFormData(prev => ({ ...prev, serviceType: typeId, category: '', subCategory: '' }));
        
        // Filter categories linked to selected Service Type ID
        const filteredCats = allMainCategories.filter(cat => {
            const typeRef = cat.serviceType?._id || cat.serviceType;
            return typeRef === typeId;
        });
        setCurrentCategoriesList(filteredCats);
        setCurrentSubCategoriesList([]);
    };

    // Trigger when Main Category changes
    const handleCategoryChange = (catId) => {
        setFormData(prev => ({ ...prev, category: catId, subCategory: '' }));

        // Filter sub-categories linked to selected Main Category ID
        const filteredSubs = allSubCategories.filter(sub => {
            const catRef = sub.mainCategory?._id || sub.mainCategory;
            return catRef === catId;
        });
        setCurrentSubCategoriesList(filteredSubs);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const resetForm = () => {
        setFormData({
            serviceType: '',
            category: '',
            subCategory: '',
            name: '',
            price: '',
            tagline: '',
            features: '',
            description: ''
        });
        setCurrentCategoriesList([]);
        setCurrentSubCategoriesList([]);
    };

    return {
        formData,
        serviceTypesList,
        currentCategoriesList,
        currentSubCategoriesList,
        handleTypeChange,
        handleCategoryChange,
        handleInputChange,
        resetForm
    };
};