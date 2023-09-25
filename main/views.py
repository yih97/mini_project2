from django.shortcuts import render
from django.http import HttpResponse
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from .models import ClosedSchoolMap
import folium
from folium.plugins import MarkerCluster
import geocoder

def main_page(request):
    #closed_school_map_df = ClosedSchoolMap.objects.all()
    map = folium.Map(location=[37.55, 126.98], zoom_start=12)
    closed_school_map_df = pd.DataFrame(ClosedSchoolMap.objects.all().values())
    for idx, row in closed_school_map_df.iterrows():  # 데이터프레임 자료를 한 라인씩 정보를 읽는다.
        folium.Marker([row["latitude"], row["longitude"]],
        #Marker([row["Latitude"], row["Longitude"]],
        popup=idx).add_to(map)
    return render(request, 'main/main.html',
    {"map":"map"})

