
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, Linking } from 'react-native';
import MaterialTable from 'material-table';
import GetAppIcon from '@material-ui/icons/GetApp';

const VerifyVaccineScreen = ({navigation}) => {
  const [tableData, setTableData] = useState([
    { name:"Mary Tan", id: 12388, department:"Finance", vaccinated:"Yes", num: 2, date:"08/08/2021", certificate: "vaccine1.jpg"   },
    { name:"John Jones", id: 12399, department:"HR", vaccinated:"Yes", num: 2, date:"09/09/2021", certificate: "vaccine1.jpg"   },
    { name:"Bruce Wayne", id: 12377, department:"Logistics", vaccinated:"No", num: 2, date:"07/07/2021", certificate: "vaccine1.jpg"   },
    { name:"Tony Stark", id: 12366, department:"Research", vaccinated:"Yes", num: 3, date:"06/06/2021", certificate: "vaccine1.jpg"   },
    
  ])
  const columns = [

    /*{ title: "Name", field: "name", sorting: false, filtering: false, cellStyle: { background:"#009688" }, headerStyle: { color: "#fff" } },
    { title: "Id", field: "id", filterPlaceholder: "filter", defaultSort:"asc"},*/

    { title: "Name", field: "name"},
    { title: "Id", field: "id" , align: "center"},
    { title: "Department", field: "department", align: "center" },
    { title: "Vaccinated", field: "vaccinated" },
    { title: "No. of doses", field: "num", align: "center",  },
    { title: "Last dose", field: "date",},
    { title: "Certificate", field: "certificate", align: "center" },
  
  
  ]
  return (
    <ScrollView>

      <View align="center">Verify Vaccine</View>
      <View align='center'>Super Admin </View>

      <MaterialTable columns={columns} data={tableData}
    
        actions={[
          {
            icon: () => <GetAppIcon />,
            tooltip: "Click me",
            onClick: (e, data) => console.log(data),
            isFreeAction:true
          }
        ]}
        onSelectionChange={(selectedRows) => console.log(selectedRows)}
        options={{
          search: true,
          searchFieldAlignment: "right", 
          searchAutoFocus: true, 
          searchFieldVariant: "standard",
          paging: true, 
          pageSizeOptions: [5, 10], 
          pageSize: 5,
          paginationType: "stepped", 
          showFirstLastPageButtons: false, 
          paginationPosition: "both", 
          exportButton: true,
          exportAllData: true, 
          exportFileName: "TableData", 
          addRowPosition: "first", 
          actionsColumnIndex: -1, 
          selection: false,
           selectionProps: rowData => ({
            disabled: rowData.age == null,
          
          }),
          columnsButton: true,
          // row Color.black : Color.white
          rowStyle: (data, index) => index % 2 === 0 ? { background: "#f5f5f5" } : null, 
          headerStyle: { background: "#51a4fb",color:"#fff"}
        }}
        title="Vaccination Information"/>
        </ScrollView>


 
  );
}
export default VerifyVaccineScreen;

