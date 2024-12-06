import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../config/api';

const STAFF_STORAGE_KEY = '@staff_data';
const LAST_UPDATE_KEY = '@last_update';

export const staffStorage = {
  // fetch staff data, preferring server but falling back to local storage
  async getStaffList() {
    try {
      // try to fetch from server
      const response = await fetch(`${getApiUrl()}/api/staff`);
      if (response.ok) {
        const data = await response.json();
        // Update local storage with new data
        await AsyncStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(data));
        await AsyncStorage.setItem(LAST_UPDATE_KEY, new Date().toISOString());
        return data;
      }
    } catch (error) {
      console.log('Network error, falling back to local data');
    }

    // if server fetch fails, get from local storage
    try {
      const storedData = await AsyncStorage.getItem(STAFF_STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : []; // converts back to object
    } catch (error) {
      console.error('Error reading from storage:', error);
      return [];
    }
  },

  // add new staff member
  async addStaffMember(staffData) {
    try {
      // try to add to server first
      const response = await fetch(`${getApiUrl()}/api/staff`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffData),
      });

      if (response.ok) {
        // Update local storage with new data
        const currentData = await this.getStaffList();
        const newStaff = await response.json();
        const updatedData = [...currentData, newStaff];
        await AsyncStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(updatedData));
        return newStaff;
      }
    } catch (error) {
      console.error('Error adding staff member:', error);
      throw error;
    }
  },

  // Update staff member
  async updateStaffMember(staffId, updateData) {
    try {
      // Try to update server first
      const response = await fetch(`${getApiUrl()}/api/staff/${staffId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        // Update local storage
        const currentData = await this.getStaffList();
        const updatedStaff = await response.json();
        const updatedData = currentData.map(staff => 
          staff.id === staffId ? updatedStaff : staff
        );
        await AsyncStorage.setItem(STAFF_STORAGE_KEY, JSON.stringify(updatedData));
        return updatedStaff;
      }
    } catch (error) {
      console.error('Error updating staff member:', error);
      throw error;
    }
  },

  // Get a single staff member
  async getStaffMember(staffId) {
    try {
      // Try server first
      const response = await fetch(`${getApiUrl()}/api/staff/${staffId}`);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Network error, falling back to local data');
    }

    // Fall back to local storage
    try {
      const storedData = await AsyncStorage.getItem(STAFF_STORAGE_KEY);
      const staffList = storedData ? JSON.parse(storedData) : [];
      return staffList.find(staff => staff.id === staffId);
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  }
};