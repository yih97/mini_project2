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
    figure = folium.Map(location=[37.55, 126.98], zoom_start=12)
    marker_cluster_kor_marker = MarkerCluster().add_to(figure)
    popups = []

    for i in ClosedSchoolMap.objects.values():

        popup_html = f"<b>{i['school_name']} ({i['closed_school_year']}년 폐교)</b>"  # 팝업 내용 수정
        popups.append(folium.Popup(popup_html, max_width=200))

    for i in range(len(ClosedSchoolMap.objects.values())):

        folium.Marker(
            location=[ClosedSchoolMap.objects.values()[i]["latitude"], ClosedSchoolMap.objects.values()[i]["longitude"]],
            icon=folium.Icon(color='blue'),  # 아이콘 색상 설정
            popup=popups[i] # 팝업 설정
        ).add_to(marker_cluster_kor_marker)

    context = {
        'map': figure._repr_html_()
           }

    return render(request, 'main/main.html', context)

    # #closed_school_map_df = ClosedSchoolMap.objects.all()
    # map = folium.Map(location=[37.55, 126.98], zoom_start=12)
    # closed_school_map_df = pd.DataFrame(ClosedSchoolMap.objects.all().values())
    # for idx, row in closed_school_map_df.iterrows():  # 데이터프레임 자료를 한 라인씩 정보를 읽는다.
    #     folium.Marker([row["latitude"], row["longitude"]],
    #     #Marker([row["Latitude"], row["Longitude"]],
    #     popup=idx).add_to(map)
    # return render(request, 'main/main.html',
    # {"map":"map"})