import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLeads = createAsyncThunk(
  "leads/fetchLeads",
  async (data, { rejectWithValue }) => {
    try {
      if (data) {
        return data;
      }
      console.warn("fetchLeads called without data. Returning empty array.");
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const leadsSlice = createSlice({
  name: "leads",
  initialState: {
    leads: [],
    filteredLeads: [],
    filters: {
      search: "",
      address: "",
      status: [],
      perPage: 10,
      currentPage: 1,
    },
    status: "idle",
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredLeads = state.leads.filter((lead) => {
        const matchesSearch =
          !state.filters.search ||
          lead.firstName
            .toLowerCase()
            .includes(state.filters.search.toLowerCase()) ||
          lead.lastName
            .toLowerCase()
            .includes(state.filters.search.toLowerCase()) ||
          lead.mobile.includes(state.filters.search);

        const matchesAddress =
          !state.filters.address ||
          lead.address
            .toLowerCase()
            .includes(state.filters.address.toLowerCase());

        const matchesStatus =
          state.filters.status.length === 0 ||
          state.filters.status.includes(lead.status);

        return matchesSearch && matchesAddress && matchesStatus;
      });
      state.filters.currentPage = 1;
    },
    setPerPage: (state, action) => {
      state.filters.perPage = action.payload;
      state.filters.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.filters.currentPage = action.payload;
    },
    addLead: (state, action) => {
      const newLead = {
        ...action.payload,
        id: action.payload.id || Date.now().toString(),
        startDate:
          action.payload.startDate || new Date().toISOString().slice(0, 10),
        status: action.payload.status || "New",
        documents: action.payload.documents || [],
        communications: action.payload.communications || [],
        messages: action.payload.messages || [],
      };
      state.leads.push(newLead);
      const currentFilters = state.filters;
      state.filteredLeads = state.leads.filter((lead) => {
        const matchesSearch =
          !currentFilters.search ||
          lead.firstName
            .toLowerCase()
            .includes(currentFilters.search.toLowerCase()) ||
          lead.lastName
            .toLowerCase()
            .includes(currentFilters.search.toLowerCase()) ||
          lead.mobile.includes(currentFilters.search);

        const matchesAddress =
          !currentFilters.address ||
          lead.address
            .toLowerCase()
            .includes(currentFilters.address.toLowerCase());

        const matchesStatus =
          currentFilters.status.length === 0 ||
          currentFilters.status.includes(lead.status);

        return matchesSearch && matchesAddress && matchesStatus;
      });
      state.filters.currentPage = 1;
    },
    updateLead: (state, action) => {
      const updatedLead = action.payload;
      const index = state.leads.findIndex((lead) => lead.id === updatedLead.id);
      if (index !== -1) {
        state.leads[index] = updatedLead;
        const currentFilters = state.filters;
        state.filteredLeads = state.leads.filter((lead) => {
          const matchesSearch =
            !currentFilters.search ||
            lead.firstName
              .toLowerCase()
              .includes(currentFilters.search.toLowerCase()) ||
            lead.lastName
              .toLowerCase()
              .includes(currentFilters.search.toLowerCase()) ||
            lead.mobile.includes(currentFilters.search);

          const matchesAddress =
            !currentFilters.address ||
            lead.address
              .toLowerCase()
              .includes(currentFilters.address.toLowerCase());

          const matchesStatus =
            currentFilters.status.length === 0 ||
            currentFilters.status.includes(lead.status);

          return matchesSearch && matchesAddress && matchesStatus;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.leads = action.payload;
        const currentFilters = state.filters;
        state.filteredLeads = state.leads.filter((lead) => {
          const matchesSearch =
            !currentFilters.search ||
            lead.firstName
              .toLowerCase()
              .includes(currentFilters.search.toLowerCase()) ||
            lead.lastName
              .toLowerCase()
              .includes(currentFilters.search.toLowerCase()) ||
            lead.mobile.includes(currentFilters.search);

          const matchesAddress =
            !currentFilters.address ||
            lead.address
              .toLowerCase()
              .includes(currentFilters.address.toLowerCase());

          const matchesStatus =
            currentFilters.status.length === 0 ||
            currentFilters.status.includes(lead.status);

          return matchesSearch && matchesAddress && matchesStatus;
        });
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilters, setPerPage, setCurrentPage, addLead, updateLead } =
  leadsSlice.actions;

export default leadsSlice.reducer;
